import React, { Component } from "react";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
    };
  }

  render() {
    const { name, email, password } = this.state;
    const { register, hasError } = this.props;

    return (
      <div class="registerimg">
        <div className="loginform content4 fade-in">
          <form
            onSubmit={(ev) => {
              ev.preventDefault;
              register({ name, email, password });
            }}
          >
            <h1 className="loginform">Register</h1>
            <div className="logindiv">
              <label htmlFor="name">Name:</label>
              <input
                className="logininputs"
                type="text"
                value={name}
                onChange={(ev) => this.setState({ name: ev.target.value })}
              />
            </div>
            <div>{name.length < 6 ? "Must be 6 or more characters" : ""}</div>
            {/* <div>{hasError ? 'Name has to be minimum of 6 characters long' : ''} </div> */}
            <div className="logindiv">
              <label htmlFor="email">Email:</label>
              <input
                className="logininputs"
                type="email"
                value={email}
                onChange={(ev) => this.setState({ email: ev.target.value })}
              />
            </div>
            <div>
              {hasError
                ? "Email taken or invalid email format. E.g. example@g.com"
                : ""}{" "}
            </div>
            <div className="logindiv">
              <label htmlFor="password">Password:</label>
              <input
                className="logininputs"
                type="password"
                value={password}
                onChange={(ev) => this.setState({ password: ev.target.value })}
              />
            </div>
            <div>
              {password.length < 6 ? "Must be 6 or more characters" : ""}
            </div>
            {/* <div>{hasError ? 'Password has to be minimum of 6 characters long' : ''} </div> */}
            {/* <button className='loginbutton'>Register</button> */}
            <button
              disabled={
                !email ||
                !password ||
                !name ||
                name.length < 6 ||
                password.length < 6
                  ? "disabled"
                  : ""
              }
              className="loginbutton"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
