import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../actions";
import { APIManager } from "../../utils";
import { Signup, AddBookmark } from "../presentation";

class Admin extends Component {
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
  register(visitor) {
    APIManager.post("/account/register", visitor, (err, response) => {
      if (err) {
        let msg = err.message || err;
        alert(msg);
        return;
      } else {
        this.props.profileCreated(response.profile);
      }
    });
  }
  login(credentials) {
    APIManager.post("/account/login", credentials, (err, response) => {
      if (err) {
        let msg = err.message || err;
        alert(msg);
        return;
      } else {
        this.props.currentUserReceived(response.profile);
      }
    });
  }
  submitLink(link) {
    // console.log("submitLink: "+ link);
    const bookmark = {
      profile: this.props.currentUser.id,
      url: link
    };
    APIManager.post("/api/bookmark", bookmark, (err, response) => {
      if (err) {
        console.log(err);
        // alert(err);
        return;
      } else {
        console.log("Submit Link: "+ JSON.stringify(response));
      }
    })
  }
  render() {
    return (
      <div>
        {this.props.currentUser == null ? (
          <Signup
            onRegister={this.register.bind(this)}
            onLogin={this.login.bind(this)}
          />
        ) : (
          <AddBookmark user={this.props.currentUser.firstName} onAddBookmark={this.submitLink.bind(this)} />
        )}
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    currentUser: state.account.currentUser
  };
};
const dispatchToProps = dispatch => {
  return {
    profileCreated: profile => dispatch(actions.profileCreated(profile)),
    currentUserReceived: profile =>
      dispatch(actions.currentUserReceived(profile))
  };
};

export default connect(stateToProps, dispatchToProps)(Admin);
