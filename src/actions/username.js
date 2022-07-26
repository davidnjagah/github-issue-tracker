import contants from "../constants";
import * as UserUtils from "../utils/user";
import * as UsernameIssues from "../graphql/username";
import { setLoading } from "./main";
import graphQlClient from "../graphql/client";

const setUser = (username) => {
  return {
    type: contants.username.SET_USER,
    payload: username,
  };
};

const setIssues = (issues) => {
  return {
    type: contants.username.SET_ISSUES,
    payload: issues,
  };
};

const setMoreIssues = (issues) => {
  return {
    type: contants.username.SET_MORE_ISSUES,
    payload: issues,
  };
};

export const setIssuesEdges = (issues) => {
  return {
    type: contants.username.SET_ISSUES_EDGES,
    payload: issues,
  };
};

export const refreshUsername = () => {
  return {
    type: contants.username.REFRESH
  };
};

export const userRequest = (request) => {
  return {
    type: contants.username.REQUEST,
    payload: request,
  };
};

export const getIssues = (username, first, after, navigation) => (dispatch, _getState) => {
  dispatch(setLoading(true));
  dispatch(userRequest(true));

  console.log("signIn");
  graphQlClient
    .query({
      query: UsernameIssues.USERNAME_ISSUES,
      variables: { username, first, after }, //remember to input variables for request
    })
    .then((result) => {
      const {
        data: { user },
      } = result;

      if(user.issues.edges.length == 0){
        alert("No Issues Available");
        navigation.pop();
      }        
      else{ 
      dispatch(setUser(user["login"]));
      dispatch(setIssues(user["issues"]));
      }
    })
      
    .catch((error) => {
      console.log("error", error);
      navigation.pop();
      alert("Input the Correct Names of the Username and/or Repository", undefined, 2);      
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};

export const getMoreIssues =
  (username, first, after, field, labels) => (dispatch, _getState) => {

    graphQlClient
      .query({
        query: UsernameIssues.USERNAME_FILTERED_ISSUES,
        variables: { username, first, after, field, labels},
      })
      .then((result) => {
        const {
          data: { user },
          loading,
        } = result;

        console.log(loading);
        if(user.issues.edges.length == 0){
          alert("No More Issues, Pull down to Refresh");
        }        
        else{        
        dispatch(setMoreIssues(user["issues"]));
        }
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => {
      });
  };


  export const getFilteredIssues = (username, first, after, field, labels) => (dispatch, _getState) => {
    dispatch(setLoading(true));    
  
    graphQlClient
      .query({
        query: UsernameIssues.USERNAME_FILTERED_ISSUES,
        variables: { username, first, after, field, labels}, //remember to input variables for request
      })
      .then((result) => {
        const {
          data: { user },
        } = result;

        dispatch(setIssues(user["issues"]));
      })        
      .catch((error) => {
        console.log("error", error);     
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };


  export const getUserIssuesStatus = (username, first, after, field, labels) => (dispatch, _getState) => {
    dispatch(setLoading(true));

    graphQlClient
      .query({
        query: UsernameIssues.USERNAME_ISSUES_STATUS,
        variables: { username, first, after, field, labels }, //remember to input variables for request
      })
      .then((result) => {
        const {
          data: { user },
        } = result;
        
        dispatch(setIssues(user.issues));
      })        
      .catch((error) => {
        console.log("error", error);     
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
 
 