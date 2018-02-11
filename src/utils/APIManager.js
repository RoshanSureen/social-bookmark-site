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
          // const confirmation = response.body.confirmation;
          // if (confirmation != "success") {
          //   callback({ message: response.body.message }, null);
          //   return;
          // } else {
          //   callback(null, response.body);
          //   return;
          // }
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
          const confirmation = response.body.confirmation;
          if (confirmation != "success") {
            callback({ message: response.body.message }, null);
            return;
          } else {
            callback(null, response.body);
            return;
          }
        }
      });
  }
};
