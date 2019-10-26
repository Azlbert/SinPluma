import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import useStyles from '../../common/Style';

import { connect } from 'react-redux';
import { Editor } from 'slate-react'
import { Value } from 'slate'
import { loadPage, savePage } from '../../actions';

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

function parseContent(content) {
    const existingValue = content === "" ? null : JSON.parse(content);
    const initialValue = Value.fromJSON(
        existingValue || {
            document: {
            nodes: [
                {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                    object: 'text',
                    text: 'Escribir...',
                    },
                ],
                },
            ],
            },
        }
    );
    return initialValue;
}

function Write(props) {
    const classes = useStyles.writer();
    const [state, setState] = React.useState({
        value: parseContent(props.page.content),
    });

    const onChange = ({ value }) => {
        if (value.document !== state.value.document) {
            const content = JSON.stringify(value.toJSON())
            props.page.content = content;
            props.save(props.page,props.id);
            setState({ value });
        }
    };

    const onKeyDown = (event, editor, next) => {
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

    const renderBlock = (props, editor, next) => {
        switch (props.node.type) {
            case 'paragraph':
                return <ParagraphNode {...props} />;
            case 'code':
                return <CodeNode {...props} />;
            default:
                return next();
        };
    };

    const renderMark = (props, editor, next) => {
        switch (props.mark.type) {
            case 'bold':
                return <BoldMark {...props} />;
            default:
                return next();
        };
    }

    return (
        <Editor
            value       = {state.value}
            onChange    = {onChange}
            onKeyDown   = {onKeyDown}
            renderBlock = {renderBlock}
            renderMark  = {renderMark}
            
            className   = {classes.input}
            style       = {{margin:'0px'}}
        />
    );
}

function Writer(props) {
    useState(() => {
        props.loadPage(props.id);
    });
    //console.log('Inside write ' + props.id);
    const classes = useStyles.writer();

    if(props.page === null){
        return '';
    }
    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} md={8}>
                <TextField
                        placeholder={"Agregar un titulo"}
                        fullWidth
                        margin="normal"
                        InputProps={{
                            classes: {
                                input: classes.title,
                            },
                        }}
                        value={props.page.title}
                        style={{marginBottom:'24px',marginTop:'35px'}}
                        onKeyUp={(event)=> {
                            props.page.title = event.target.value;
                            props.savePage(props.page,props.id);
                        }}
                />
                <Paper>
                    <Write page={props.page} save={props.savePage} id={props.id}/>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
                <Paper className={classes.paper} style={{marginBottom:'24px',marginTop:'35px',marginLeft:'24px'}}>
                    Hola
                </Paper>
            </Grid>
        </Grid>
    );
};

const mapStateToProps = (state) => ({
    page: state.page,
});

const mapDispatchToProps = {
    loadPage: loadPage,
    savePage: savePage
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Writer);