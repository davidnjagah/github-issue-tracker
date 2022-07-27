import React from "react";
import { View, Text, Pressable } from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import { getRepoIssuesLabels } from "../../actions/repository";
import { getUserIssuesStatus } from "../../actions/username";
import { setStatus } from "../../actions/main";
import { GraphQLEnumType } from 'graphql';

const IssueStatus = (props) => {
  const {
    status,
    stateStatus,
    navigation,
    username,
    repository,
    repouser,
    userrequest,
    reporequest,
    filterValue,
    setNewStatus,
    getUsernameIssuesStatus,
    getRepositoryIssuesLabels,
  } = props;

  const first = 10;
  const after = null;
  const label = null;
  const red = "#FF0000";
  const green = "#008000";
  const statusNew = null;

  var stateTypes = new GraphQLEnumType({
    name: 'OPEN',
    values: {
      OPEN: { value: "OPEN" },
    }
  });

  const handleClick = () => {//Add pressable to status to call this action
    console.log(JSON.stringify(status));
    console.log(stateStatus);
    setNewStatus(status);//it has an issue of enum type to pass to graphql which is not supported in javascript.   

    if (userrequest) {
      getUsernameIssuesStatus(username, first, after, filterValue, label, status);
    } 
    else{ 
      getRepositoryIssuesLabels(
        repouser,
        repository,
        first,
        after,
        filterValue,
        label,
        status
      );
    };
    
    navigation.navigate("IssuePage");
  };

  return (
    <View style={styles.issuestatuscontainer}>
      <View
        style={[
          styles.issuestatus,
          {
            backgroundColor: status == "OPEN" ? red : green,
          },
        ]}
      >
        <Text style={styles.issuestatustext}> {status} </Text>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    filterValue: state.main.filter,
    stateStatus: state.main.status,
    userrequest: state.username.userRequest,
    reporequest: state.repository.repoRequest,
    username: state.username.username,
    repository: state.repository.repository.repository,
    repouser: state.repository.repository.username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsernameIssuesStatus: (username, first, after, field, label, status) => {
      dispatch(getUserIssuesStatus(username, first, after, field, label, status));
    },
    getRepositoryIssuesLabels: (
      username,
      repository,
      first,
      after,
      field,
      label,
      status
    ) => {
      dispatch(
        getRepoIssuesLabels(username, repository, first, after, field, label, status)
      );
    },
    setNewStatus: (status) => {
      dispatch(setStatus(status));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IssueStatus);
