import constants from "../constants";

export default {
  profilesReceived: profiles => {
    return {
      type: constants.PROFILES_RECEIVED,
      profiles
    };
  },
  profileCreated: profile => {
    return {
      type: constants.PROFILE_CREATED,
      profile
    };
  },
  currentUserReceived: profile => {
    return {
      type: constants.CURRENT_USER_RECEIVED,
      profile
    };
  },
  bookmarksReceived: bookmarks => {
    return {
      type: constants.BOOKMARKS_RECEIVED,
      bookmarks
    };
  },
  profileSelected: profile => {
    return {
      type: constants.PROFILE_SELECTED,
      profile
    };
  }
};
