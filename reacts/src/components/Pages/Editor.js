import { Editor as SlateEditor } from 'slate-react';
import { Value } from 'slate';

import React from 'react';
import initialValueAsJson from './value.json';
import { loadPage, savePage, sentiment } from '../../actions';
import { connect } from 'react-redux';

let n = 0;

function getHighlightKey() {
    return `highlight_${n++}`
}

function getInitialValue(content) {
    const existingValue = content === "" ? null : JSON.parse(content);
    const initialValue = Value.fromJSON(
        existingValue || initialValueAsJson
    );
    return initialValue;
}

function CodeNode(props) {
    return (
        <h1 {...props.attributes} style={{marginTop:'0px'}}>{props.children}</h1>
    );
};

function ParagraphNode(props) {
    return (
        <p {...props.attributes} style={{marginTop:'0px'}}>
            {props.children}
        </p>
    );
};

function BoldMark(props) {
    return <mark style={{backgroundColor:'cyan',marginTop:'0px'}}>{props.children}</mark>
}

class Editor extends React.Component {
    value = getInitialValue(this.props.page.content);

    schema = {
        annotations: {
            highlight: {
                isAtomic: true,
            },
        },
    }

    ref = React.createRef()

    componentDidMount() {
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
    }

    render() {
        return (
            <SlateEditor
                ref             ={this.ref}
                schema          ={this.schema}
                defaultValue    ={this.value}
                onChange        ={this.onChange}
                onKeyDown       = {this.onKeyDown}
                
                renderBlock         = {this.renderBlock}
                renderMark          = {this.renderMark}
                renderAnnotation    ={this.renderAnnotation}
            
                placeholder ="Erase una vez..."
                className   ={this.props.className}
                style       = {{margin:'0px'}}
                spellCheck
                /* readOnly */
            />
        );
    };

    onKeyDown = (event, editor, next) => {
        if (event.keyCode === 13 && !event.shiftKey) {
            event.preventDefault();
            return editor.insertBlock('paragraph');
        }
        if (!event.ctrlKey) return next();

        switch (event.key) {
            case 'b': {
                event.preventDefault();
                editor.toggleMark('bold');
                break;
            }
            case 'ñ': {
                event.preventDefault();
                const isCode = editor.value.blocks.some(block => block.type === 'code');
                editor.setBlocks(isCode ? 'paragraph' : 'code');
                break;
            }
            default: {
                return next();
            }
        };
    };

    renderBlock = (props, editor, next) => {
        switch (props.node.type) {
            case 'paragraph':
                return <ParagraphNode {...props} />;
            case 'code':
                return <CodeNode {...props} />;
            default:
                return next();
        };
    };

    renderMark = (props, editor, next) => {
        switch (props.mark.type) {
            case 'bold':
                return <BoldMark {...props} />;
            default:
                return next();
        };
    }

    renderAnnotation = (props, editor, next) => {
        const { children, annotation, attributes } = props

        switch (annotation.type) {
            case 'highlight':
            return (
                <span {...attributes} style={{ backgroundColor: '#ffeeba' }}>
                    {children}
                </span>
            )
            default:
            return next()
        }
    }

    renderMark = (props, editor, next) => {
        const { children, mark, attributes } = props

        switch (mark.type) {
            case 'bold':
            return <strong {...attributes}>{children}</strong>
            default:
            return next()
        }
    }

    onChange = ({ value }) => {
        if (value.document !== this.value.document) {
            const content = JSON.stringify(value.toJSON())
            this.props.page['content'] = content;
            this.props.savePage(this.props.page,this.props.id);
            this.value = value;
            console.log("No es mi culpa!");
        }
    };

    onInputChange = () => {
        const editor = this.ref.current;
        const { value } = editor;
        const { document, annotations } = value;
        //const string = event.target.value

        // Make the change to annotations without saving it into the undo history,
        // so that there isn't a confusing behavior when undoing.
        editor.withoutSaving(() => {
            annotations.forEach(ann => {
                if (ann.type === 'highlight') {
                    editor.removeAnnotation(ann);
                };
            });
            let sentences = [];

            for (const [node, path] of document.texts()) {
                const { key, text } = node;
                const parts = text.split(/\.|\n/);
                //console.log(parts);
                
                let offset = 0;
                
                parts.forEach((part, i) => {
                    //console.log("anchor "+ part.length + " focus " + offset);
                    if(part.length > 0){
                        sentences.push({
                            sentence: part,
                            sentiment: 'neutral',
                            position: {
                                focus: { path, key, offset },
                                anchor: { path, key, offset: part.length + offset},
                            }
                        });
                        /* editor.addAnnotation({
                            key: getHighlightKey(),
                            type: 'highlight',
                            focus: { path, key, offset },
                            anchor: { path, key, offset: part.length + offset},
                        }); */
                    }
                    offset = offset + part.length + 1;
                })
            };

            this.props.sentiment(sentences);
        });
    };
};

const mapStateToProps = state => ({
    page: state.page,
});

const mapDispatchToProps = {
    loadPage: loadPage,
    savePage: savePage,
    sentiment: sentiment
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Editor);