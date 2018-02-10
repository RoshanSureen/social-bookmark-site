import React, { Component } from "react";
import { APIManager } from "../../utils";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      visitor: {
        firstName: "",
        lastName: "",
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
  register(event) {
    event.preventDefault();
    APIManager.post("/account/register", this.state.visitor, (err, response) => {
      if (err) {
        let msg = err.message || err;
        alert(msg);
        return;
      } else {
        console.log("REGISTER: "+JSON.stringify(response));
      }
    });
  }
  render() {
    return (
      <div>
        <h2>Sign Up</h2>
          <input
            onChange={this.updateVisitor.bind(this)}
            type="text"
            id="firstName"
            placeholder="FirstName"
          />
          <br />
          <input
            onChange={this.updateVisitor.bind(this)}
            type="text"
            id="lastName"
            placeholder="Last Name"
          />
          <br />
          <input
            onChange={this.updateVisitor.bind(this)}
            type="text"
            id="email"
            placeholder="Email"
          />
          <br />
          <input
            onChange={this.updateVisitor.bind(this)}
            type="text"
            id="password"
            placeholder="Password"
          />
          <br />
          <button onClick={this.register.bind(this)}>Join</button>
          <br />
      </div>
    );
  }
}

export default Signup;
