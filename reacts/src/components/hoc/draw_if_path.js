import { withRouter } from 'react-router';

const DrawIfPath = props => {
    const {pathname} = props.location;
    if(props.actualPath === pathname)  return '';
    return props.children;
}

export default withRouter(DrawIfPath);
