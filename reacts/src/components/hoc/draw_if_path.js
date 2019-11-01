import React from 'react';
import { withRouter } from 'react-router';

const DrawIfPath = props => {
    const {pathname} = props.location;
    console.log(props.actualPath + " - " + pathname);
    if(props.actualPath == pathname)  return '';
    return props.children;
}

export default withRouter(DrawIfPath);
