import React, { Component } from "react";
import { APIManager } from "../../utils";
import { connect } from "react-redux";
import actions from "../../actions";

class Bookmarks extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    APIManager.get("/api/bookmark", null, (err, response) => {
      if (err) {
        return;
      } else {
        this.props.bookmarksReceived(response.results);
      }
    });
  }
  render() {
    return (
      <div>
        <h2>Bookmarks</h2>
        <ol>
          {this.props.bookmarks.map((bookmark, i) => {
            return <li key={bookmark.id}>{bookmark.title}</li>;
          })}
        </ol>
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    bookmarks: state.bookmark.all
  };
};
const dispatchToProps = dispatch => {
  return {
    bookmarksReceived: bookmarks =>
      dispatch(actions.bookmarksReceived(bookmarks))
  };
};
export default connect(stateToProps, dispatchToProps)(Bookmarks);
