import React, { Component } from "react";
import { APIManager } from "../../utils";
import actions from "../../actions";
import { connect } from "react-redux";

class Signup extends Component {
  constructor() {
    super();
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
  componentDidMount() {
    // check the current user
    APIManager.get("/account/currentuser", null, (err, response) => {
      if (err) {
        alert(err);
        return;
      } else {
        if (response.profile == null) {
          return;
        } else {
          // user is logged in, dispatch action
          this.props.currentUserReceived(response.profile);
        }
      }
    });
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
    APIManager.post(
      "/account/register",
      this.state.visitor,
      (err, response) => {
        if (err) {
          let msg = err.message || err;
          alert(msg);
          return;
        } else {
          this.props.profileCreated(response.profile);
        }
      }
    );
  }
  login(event) {
    event.preventDefault();
    APIManager.post(
      "/account/login",
      this.state.registeredUser,
      (err, response) => {
        if (err) {
          let msg = err.message || err;
          alert(msg);
          return;
        } else {
          this.props.currentUserReceived(response.profile);
        }
      }
    );
  }
  render() {
    return this.props.currentUser != null ? (
      <h2>Hello {this.props.currentUser.firstName}</h2>
    ) : (
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
        <h2>Login</h2>
        <input
          onChange={this.updateRegisteredUser.bind(this)}
          type="text"
          id="email"
          placeholder="Email"
        />
        <br />
        <input
          onChange={this.updateRegisteredUser.bind(this)}
          type="text"
          id="password"
          placeholder="Password"
        />
        <br />
        <button onClick={this.login.bind(this)}>Login</button>
        <br />
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    profiles: state.profile.list,
    currentUser: state.account.currentUser
  };
};
const dispatchToProps = dispatch => {
  return {
    profileCreated: profile => dispatch(actions.profileCreated(profile)),
    currentUserReceived: profile => dispatch(actions.currentUserReceived(profile))
  };
};

export default connect(stateToProps, dispatchToProps)(Signup);
