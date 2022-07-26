import contants from "../constants";

const initialState = {
  username: {},
  userIssues: {
    pageInfo: {},
    edges: [],
  },
  userRequest: false,
};

const username = (state = initialState, action) => {
  switch (action.type) {
    case contants.username.SET_USER:
      return { ...state, username: action.payload };
    case contants.username.SET_ISSUES:
      return { ...state, userIssues: action.payload };
    case contants.username.SET_MORE_ISSUES:
      return { ...state, 
        userIssues:{
        ...state.userIssues,
        pageInfo: action.payload.pageInfo,
        edges: state.userIssues.edges.concat(action.payload.edges)
        }};
    case contants.username.REQUEST:
      return { ...state, userRequest: action.payload };
    case contants.username.SET_ISSUES_EDGES:
      return { ...state, userIssues:{ edges: action.payload }};
    default:
      return state;
  }
};

export default username;
