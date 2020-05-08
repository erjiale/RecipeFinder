import React, { Component } from 'react';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: ''
        };
    }

    render() {
        const { name, email, password } = this.state;
        const { register } = this.props;

        return (
            <div>
            <div className="loginform">
                <form onSubmit={ ev => {
                    ev.preventDefault; 
                    register({ name, email, password })
                } }>
                <h1 className='loginform'>Register</h1>
                    <div className='logindiv'>
                        <label htmlFor='email'>Email:</label>
                        <input className='logininputs' type='email' value={ email } onChange={ ev => this.setState({ email: ev.target.value }) }/> 
                    </div>
                    <div className='logindiv'>
                        <label htmlFor='name'>Name:</label>
                        <input className='logininputs' type='text' value={ name } onChange={ ev => this.setState({ name: ev.target.value }) } /> 
                    </div>
                    <div className='logindiv'>
                        <label htmlFor='password'>Password:</label>
                        <input className='logininputs' type='password' value={ password } onChange={ ev => this.setState({ password: ev.target.value }) } /> 
                    </div>
                    <button className='loginbutton'>Register</button>
                </form>
            </div>
            
            <div className="footWh"></div>
            <div className="footWh"></div>
            </div>
        );
    }
};

export default Register;