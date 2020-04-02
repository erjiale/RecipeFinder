import React, { Component } from 'react';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        };
    }

    render() {
        const { email, password } = this.state;
        const { login } = this.props;

        return (
            <div className="loginform">

                <form onSubmit={ ev => {ev.preventDefault; login({ email, password })} }>

                    <h1 className='loginform'>Login</h1>
                    <div className='logindiv'>
                        <label htmlFor='email'>Email:</label>
                        <input className='logininputs' type='text' value={ email } onChange={ ev => this.setState({ email: ev.target.value }) }/> 
                    </div>
                    <div className='logindiv'><label htmlFor='password'>Password:</label>
                        <input className='logininputs' type='password' value={ password } onChange={ ev => this.setState({ password: ev.target.value }) } /> 
                    </div>
                    <button className='loginbutton'>LOGIN</button>
                </form>
            </div>
        );
    }
};

export default Login;