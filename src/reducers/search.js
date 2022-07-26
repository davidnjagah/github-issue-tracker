import contants from "../constants";

const initialState = {
  search: "",
  searchIssues: {},
  searchRequest: false,
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case contants.search.SET_SEARCH:
      return { ...state, search: action.payload };
    case contants.username.SET_ISSUES:
      return { ...state, searchIssues: action.payload };
    case contants.username.REQUEST:
      return { ...state, searchRequest: action.payload };
    default:
      return state;
  }
};

export default search;
