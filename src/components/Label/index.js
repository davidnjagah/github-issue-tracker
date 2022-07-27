import React from "react";
import { View, Text, Pressable } from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import {getRepoIssuesLabels} from "../../actions/repository";
import { getFilteredIssues} from "../../actions/username";
import { setLabel } from "../../actions/main";
import { GraphQLEnumType } from 'graphql';

const IssueLabel = (props) => {
  
  const{
    label,
    navigation,
    username,
    filterValue,
    repository,
    repouser,
    userrequest,
    reporequest,
    setNewLabel,
    getFilteredUserIssues,
    getRepositoryIssuesLabels,
  } = props
    
  const { 
    name   
  } = label;

  const first = 10;
  const after = null;
  let status = null; 


  var stateTypes = new GraphQLEnumType({
    name: 'OPEN',
    values: {
      OPEN: { value: "OPEN" },
    }
  });


  const handleClick = () => {
    setNewLabel(name);
    if (userrequest) {
      getFilteredUserIssues(username, first, after, filterValue, name);
    }
    else{ 
     getRepositoryIssuesLabels(repouser, repository, first, after, filterValue, name);
    };
    navigation.navigate("IssuePage");
  };

  return (
    <View>
      <Pressable
        onPress={() => {
          setTimeout(() => {
            handleClick();
          }, 400);
        }}
      >
        <View style={styles.label}>
          <Text style={styles.labeltext}>{name}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    filterValue: state.main.filter,
    userrequest: state.username.userRequest,
    reporequest: state.repository.repoRequest,
    username: state.username.username,
    repository: state.repository.repository.repository,
    repouser: state.repository.repository.username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFilteredUserIssues: (username, first, after, field, label) => {
      dispatch(getFilteredIssues(username, first, after, field, label));
    },
    getRepositoryIssuesLabels: (
      username,
      repository,
      first,
      after,
      field,
      label
    ) => {
      dispatch(
        getRepoIssuesLabels(username, repository, first, after, field, label)
      );
    },
    setNewLabel: (label) => {
      dispatch(setLabel(label));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IssueLabel);
