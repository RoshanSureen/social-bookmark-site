import React, { Component } from "react";
import { APIManager } from "../../utils";
import actions from "../../actions";
import { connect } from "react-redux";

class Profiles extends Component {
  constructor() {
    super();
    this.state = {
      profiles: []
    };
  }
  componentDidMount() {
    APIManager.get("/api/profile", null, (err, response) => {
      const results = response.results;
      this.props.profilesReceived(results);
    });
  }
  render() {
    const list = this.props.profiles.map((profile, i) => {
      return <li key={profile.id}>{profile.firstName}</li>;
    });
    return (
      <div>
        <h2>Profiles</h2>
        <ol>{list}</ol>
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    profiles: state.profile.list
  };
};
const dispatchToProps = dispatch => {
  return {
    profilesReceived: profiles => dispatch(actions.profilesReceived(profiles))
  };
}
export default connect(stateToProps, dispatchToProps)(Profiles);
