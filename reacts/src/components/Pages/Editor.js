import { Editor as SlateEditor } from 'slate-react';
import { Value } from 'slate';

import React from 'react';
import initialValueAsJson from './value.json';
import { loadPage, savePage, sentiment, clearStates } from '../../actions';
import { connect } from 'react-redux';

let n = 0;

function getHighlightKey() {
    return `highlight_${n++}`
}

function getInitialValue(content) {
    const existingValue = content === "" ? null : JSON.parse(content);
    const initialValue = Value.fromJSON(existingValue || initialValueAsJson);
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

    ref = React.createRef();

    componentDidMount() {
        this.props.onRef(this);
    }
    
    componentWillUnmount() {
        this.props.clearStates();
        this.props.onRef(undefined);
    }

    componentDidUpdate() {
        this.clearAnnotations();
        if(this.isAnalizing()){
            this.ref.current.withoutSaving(() => {
                this.props.sentiments.forEach(element => {
                    this.ref.current.addAnnotation(element.conf);
                });
            });
        }
    }

    render() {
        const readOnly = typeof this.props.readOnly === 'undefined' ? this.isAnalizing() : this.props.readOnly;
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
                readOnly    = {readOnly}
                spellCheck
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
            case 'positive':
            return (
                <span {...attributes} style={{borderRadius: '0.4em/0.2em', backgroundColor: '#3333ff',color:'white', textShadow: '2px 2px 8px white' }}>
                    {children}
                </span>
            )
            case 'negative':
            return (
                <span {...attributes} style={{borderRadius: '0.4em/0.2em',  backgroundColor: '#ff3300',color:'white', textShadow: '2px 2px 8px white' }}>
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
        }
    };

    analize = () => {
        if(this.isAnalizing()){
            this.props.sentiment(null);
            return;
        }
        
        const editor = this.ref.current;
        const { value } = editor;
        const { document } = value;
        
        editor.withoutSaving(() => {
            let sentences = [];

            for (const [node, path] of document.texts()) {
                const { key, text } = node;
                const parts = text.split(/\.|\n/);
                
                let offset = 0;
                
                parts.forEach((part, i) => {
                    let j = part.length;
                    let trimRight = 0;
                    while (j--) {
                        if(part.charAt(j)!==' '){
                            break;
                        }
                        if(j===0){
                            return;
                        }
                        trimRight++
                    }
                    let trimLeft = 0;
                    for (let d = 0; d <= part.length; d++) {
                        if(part.charAt(d)!==' '){
                            break;
                        }
                        trimLeft++
                    };
                    
                    if(part.length > 0){
                        const conf = {
                            key: getHighlightKey(),
                            type: 'positive',
                            focus: { path, key, offset: offset + trimLeft},
                            anchor: { path, key, offset: part.length + offset - trimRight},
                        };
                        sentences.push({
                            conf: conf,
                            sentence: part,
                        });
                    };
                    offset = offset + part.length + 1;
                })
            };
            this.props.sentiment(sentences);
        });
    };

    clearAnnotations = () => {
        const editor = this.ref.current;
        const { value } = editor;
        const { annotations } = value;
        annotations.forEach(ann => {
            if (ann.type === 'positive' || ann.type === 'negative') {
                editor.removeAnnotation(ann);
            };
        });
    };

    isAnalizing = () => {
        return typeof this.props.sentiments !== 'undefined' && this.props.sentiments != null;
    };
};

const mapStateToProps = (state,ownProps) => {
    return {
        page: state.page,
        sentiments: state.sentiments
    };
};

const mapDispatchToProps = {
    loadPage: loadPage,
    savePage: savePage,
    sentiment: sentiment,
    clearStates: clearStates
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Editor);