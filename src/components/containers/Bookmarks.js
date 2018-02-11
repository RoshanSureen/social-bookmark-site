import React, { Component } from "react";
import { APIManager } from "../../utils";

class Bookmarks extends Component {
  constructor() {
    super();
    this.state = {
      bookmarks: []
    };
  }
  componentDidMount() {
    APIManager.get("/api/bookmark", null, (err, response) => {
      if (err) {
        return;
      } else {
        console.log("Bookmarks: "+ JSON.stringify(response));
        this.setState({
          bookmarks: response.results
        });
      }
    });
  }
  render() {
    return (
      <div>
        <h2>Bookmarks</h2>
        <ol>
          {
            this.state.bookmarks.map((bookmark, i) => {
              return (
                <li key={bookmark.id}>{bookmark.title}</li>
              )
            })
          }
        </ol>
      </div>
    );
  }
}

export default Bookmarks