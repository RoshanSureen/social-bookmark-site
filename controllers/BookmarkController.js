var Bookmark = require("../models/Bookmark");
var Promise = require("bluebird");
var superagent = require("superagent");
var utils = require("../utils");

module.exports = {
  find: function(params, isRaw) {
    return new Promise((resolve, reject) => {
      if (isRaw == null) {
        isRaw = false;
      }
      Bookmark.find(params, (err, bookmarks) => {
        if (err) {
          reject(err);
          return;
        } else {
          if (isRaw == true) {
            resolve(bookmarks);
            return;
          }
          var summaries = [];
          bookmarks.forEach(bookmark => summaries.push(bookmark.summary()));
          resolve(summaries);
          return;
        }
      });
    });
  },
  findById: function(id) {
    return new Promise((resolve, reject) => {
      Bookmark.findById(id, (err, bookmark) => {
        if (err) {
          reject(err);
          return;
        } else {
          resolve(bookmark.summary());
          return;
        }
      });
    });
  },
  create: function(params) {
    return new Promise((resolve, reject) => {
      superagent
        .get(params.url)
        .query(null)
        .set("Accept", "text/html")
        .end((err, response) => {
          if (err) {
            reject(err);
            return;
          } else {
            var html = response.text;
            var metaData = utils.Scraper.scrape(html, [
              "og:title",
              "og:description",
              "og:image",
              "og:url"
            ]);
            Bookmark.create(metaData, (err, bookmark) => {
              if (err) {
                reject(err);
                return;
              } else {
                resolve(bookmark.summary());
                return;
              }
            });
          }
        });
    });
  }
};
