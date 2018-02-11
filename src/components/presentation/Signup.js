import React, { Component } from "react";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visitor: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      },
      registeredUser: {
        email: "",
        password: ""
      }
    };
  }
  updateVisitor(event) {
    let updated = Object.assign({}, this.state.visitor);
    updated[event.target.id] = event.target.value;
    this.setState({
      visitor: updated
    });
  }
  updateRegisteredUser(event) {
    let updated = Object.assign({}, this.state.registeredUser);
    updated[event.target.id] = event.target.value;
    this.setState({
      registeredUser: updated
    });
  }
  register(event) {
    event.preventDefault();
    this.props.onRegister(this.state.visitor)
  }
  login(event) {
    event.preventDefault();
    this.props.onLogin(this.state.registeredUser);
  }
  render() {
    return (
      <div>
        <h2>Sign Up</h2>
        <input
          onChange={this.updateVisitor.bind(this)}
          type="text"
          id="firstName"
          placeholder="First Name"
        />{" "}
        <br />
        <input
          onChange={this.updateVisitor.bind(this)}
          type="text"
          id="lastName"
          placeholder="Last Name"
        />{" "}
        <br />
        <input
          onChange={this.updateVisitor.bind(this)}
          type="text"
          id="email"
          placeholder="Email"
        />{" "}
        <br />
        <input
          onChange={this.updateVisitor.bind(this)}
          type="text"
          id="password"
          placeholder="Password"
        />{" "}
        <br />
        <button onClick={this.register.bind(this)}>Join</button>
        <br />
        <h2>Login</h2>
        <input
          onChange={this.updateRegisteredUser.bind(this)}
          type="text"
          id="email"
          placeholder="Email"
        />{" "}
        <br />
        <input
          onChange={this.updateRegisteredUser.bind(this)}
          type="text"
          id="password"
          placeholder="Password"
        />{" "}
        <br />
        <button onClick={this.login.bind(this)}>Log In</button>
      </div>
    );
  }
}

export default Signup;
