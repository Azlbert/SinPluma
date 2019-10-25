import React from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import useStyles from "../Style";

import { Editor } from 'slate-react'
import { Value } from 'slate'

// TODO: To mucho to do here

const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        text: 'Escribe...',
                    },
                ],
            },
        ],
    },
});

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

function Write() {
    const classes = useStyles.writer();
    const [state, setState] = React.useState({
        value: initialValue,
    });

    const onChange = ({ value }) => {
        setState({ value })
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

export default function Page() {
    const classes = useStyles.writer();
    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} md={8}>
                <TextField
                        placeholder="Un titulo"
                        fullWidth
                        margin="normal"
                        InputProps={{
                            classes: {
                                input: classes.title,
                            },
                        }}
                        style={{marginBottom:'24px',marginTop:'35px'}}
                />
                <Paper>
                    <Write />
                </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
                <Paper className={classes.paper} style={{marginBottom:'24px',marginTop:'35px',marginLeft:'24px'}}>Hola</Paper>
            </Grid>
        </Grid>
    );
};