import React from "react";
import { Field, reduxForm } from 'redux-form'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class Login extends React.Component{
    
    renderEmail({input}){
        return (
            <TextField
                id="outlined-email-input"
                label="Email"
                type="email"
                name="email"
                autoComplete="email"
                margin="normal"
                variant="outlined"
                {...input} 
            />
        );
    };

    renderPassword({input}){
        return (
            <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                margin="normal"
                variant="outlined"
                {...input} 
            />
        );
    };

    onSubmit(formValues){
        console.log(formValues);
    }
    
    render(){
        return(
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>   
                <Field name="email" component={this.renderEmail}/>
                <br />
                <Field name="password" component={this.renderPassword}/>
                <br />
                <Button fullWidth variant="outlined" size="large" color="primary">
                    Ingresar
                </Button>
            </form>
        );
    };
};

export default reduxForm({
    form: 'login'
})(Login);