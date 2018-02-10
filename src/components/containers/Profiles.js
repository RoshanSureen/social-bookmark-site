import React, { Component } from "react";
import { APIManager } from "../../utils";

class Profiles extends Component {
  constructor() {
    super();
    this.state = {
      profiles: []
    }
  }
  componentDidMount() {
    console.log("componentDidMount: ");
    APIManager.get("/api/profile", null, (err, response) => {
      console.log(JSON.stringify(response));
      const results = response.results;
      this.setState({
        profiles: results
      });
    });
  }
  render() {
    const list = this.state.profiles.map((profile, i) => {
      return (
        <li key={profile.id}>{profile.firstName}</li>
      )
    });
    return (
      <div>
        <h2>Profiles</h2>
        <ol>
          {list}
        </ol>
      </div>
    );
  }
}

export default Profiles