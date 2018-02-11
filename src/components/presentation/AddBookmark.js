import React, { Component } from "react";

class AddBookmark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ""
    };
  }
  update(event) {
    this.setState({
      url: event.target.value
    });
  }
  AddBookmark(event) {
    event.preventDefault();
    this.props.onAddBookmark(this.state.url);
  }
  render() {
    return (
      <div>
        <h2>Welcome {this.props.user}</h2>
        <input
          onChange={this.update.bind(this)}
          type="text"
          placeholder="http://www.example.com"
        />
        <br />
        <button onClick={this.AddBookmark.bind(this)}>Save Link</button>
      </div>
    );
  }
}

export default AddBookmark;
