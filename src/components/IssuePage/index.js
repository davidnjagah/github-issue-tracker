import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
import styles from "./styles";
import IssueList from "../IssueList";
import { connect } from "react-redux";

const IssuePage = (props) => {
  const { loading, navigation, issues, error } = props;  

  if (loading) {
    return (
      <View style={styles.loading}>        
        <ActivityIndicator size="large" color="#000FFF" />
        <Text style={styles.subtitle}>Fetching Issues...</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.page}>
        <IssueList navigation={navigation} />
      </View>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    loading: state.main.loading,
  };
};

export default connect(mapStateToProps)(IssuePage);
