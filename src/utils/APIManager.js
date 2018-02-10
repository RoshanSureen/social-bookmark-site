import Superagent from "superagent";

export default {
  get: (endpoint, params, callback) => {
    Superagent.get(endpoint)
      .query(params)
      .set("Accept", "application/json")
      .end((err, response) => {
        if (err) {
          callback(err, null);
          return;
        } else {
          callback(null, response.body);
        }
      });
  },
  post: function(endpoint, params, callback) {
    Superagent.post(endpoint)
      .send(params)
      .set("Accept", "application/json")
      .end((err, response) => {
        if (err) {
          callback(err, null);
          return;
        } else {
          callback(null, response.body);
        }
      });
  }
};
