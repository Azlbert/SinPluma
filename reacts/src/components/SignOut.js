import React            from 'react';
import { connect } from 'react-redux';
import { UNAUTHENTICATED } from '../common/Session'
import api from "../common/Api";

const SignOut = (props) => {
    React.useState(() => {
        props.signOutAction();
    })
    return <React.Fragment>SignOut</React.Fragment>;
}

const signOutAction = () => async dispatch => {
    try{
        await api.post('/logout',{},{
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
            }
        });

    }catch(e){
        localStorage.clear();
        dispatch({
            type: UNAUTHENTICATED
        });
    }
};

const mapDispatchToProps = {
    signOutAction: signOutAction
};

export default connect(null, mapDispatchToProps)(SignOut);