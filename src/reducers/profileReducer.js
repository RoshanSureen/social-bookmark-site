import constants from "../constants";

var initialState = {
  list: [] // store all profiles in an array
};

export default (state = initialState, action) => {
  let updated = Object.assign({}, state);
  switch (action.type) {
    case constants.PROFILES_RECEIVED:
      console.log("PROFILES_RECEIVED: " + JSON.stringify(action.profiles));
      updated["list"] = action.profiles;
      return updated;

    case constants.PROFILE_CREATED:
      console.log("PROFILE_CREATED: " + JSON.stringify(action.profile));
      let updatedList = Object.assign([], updated.list);
      updatedList.push(action.profile);
      updated["list"] = updatedList;
      return updated;

    default:
      return state;
  }
};
