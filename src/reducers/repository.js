import contants from "../constants";

const initialState = {
  repository: {},
  repositoryIssues: {
    pageInfo: {},
    edges: []
  },
  repoRequest: false,
};

const repository = (state = initialState, action) => {
  switch (action.type) {
    case contants.repository.SET_REPOSITORY:
      return { ...state, repository: action.payload };
    case contants.repository.SET_ISSUES:
      return { ...state, repositoryIssues: action.payload };
    case contants.repository.SET_MORE_ISSUES:
      return { ...state, 
        repositoryIssues:{
        ...state.repositoryIssues,
        pageInfo: action.payload.pageInfo,
        edges: state.repositoryIssues.edges.concat(action.payload.edges)
        }};
    case contants.repository.REQUEST:
      return { ...state, repoRequest: action.payload };
    default:
      return state;
  }
};

export default repository;