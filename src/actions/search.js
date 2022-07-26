import contants from "../constants";
import * as Search from "../graphql/search";
import { setLoading} from "./main";
import graphQlClient from "../graphql/client";

export const setSearch = (search) => {
  return {
    type: contants.search.SET_SEARCH,
    payload: search,
  };
};

const setIssues = (issues) => {
  return {
    type: contants.search.SET_ISSUES,
    payload: issues,
  };
};

export const setSearchRequest = (request) => {
  return {
    type: contants.search.REQUEST,
    payload: request,
  };
};

export const getSearchIssues = (labels, first, after, type) => (dispatch, _getState) => {
  dispatch(setLoading(true));
  dispatch(searchRequest(true));

  console.log("signIn");
  graphQlClient
    .query({
      query: Search.SEARCH,
      variables: { labels, first, after, type }, 
    })
    .then((result) => {
      const {
        data: { search },
      } = result;

      if(search.issues.edges.length == 0){
        alert("No More Issues, Pull down to Refresh");
      }        
      else{
      dispatch(setIssues(search["issues"]));
      }     
      
    })
    .catch((error) => {
      console.log("error", error);
      alert("Error with Search", undefined, 2);      
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};