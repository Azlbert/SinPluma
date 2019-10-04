import React            from 'react';
import { connect } from 'react-redux';
import { UNAUTHENTICATED } from '../common/Session'

const SignOut = (props) => {
    props.signOutAction();
    return <React.Fragment>SignOut</React.Fragment>;
}

function mapDispatchToProps(dispatch) {
    return {
        signOutAction: () => {
            sessionStorage.clear();
            dispatch({
                type: UNAUTHENTICATED
            });
        }
    };
}

export default connect(null, mapDispatchToProps)(SignOut);