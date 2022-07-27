import React from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import styles from "./styles";
import { Feather as Icon } from "@expo/vector-icons";
import { shorten } from "../../utils/stringUtils";
import "intl";
import "intl/locale-data/jsonp/en";
import Label from "../Label";
import Status from "../Status";

const Issue = (props) => {

  const { 
    navigation, 
    issue,
   } = props;

  var onEndReachedCalledDuringMomentum = true;

  const {
    author: { login },
    repository: { name },
    labels: { nodes },
    createdAt,
    id,
    state,
    title,
    number,
    body,
    comments: { edges },
  } = issue;


  const handleClick = () => {
    navigation.navigate("IssueDescription", issue);
  };
 

  if ("__setDefaultTimeZone" in Intl.DateTimeFormat) {
    Intl.DateTimeFormat.__setDefaultTimeZone("America/Los_Angeles");
  }

  let issuedate = Date.parse(createdAt);
  let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(issuedate);
  let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(issuedate);
  let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(issuedate);
  issuedate = `${da}-${mo}-${ye}`;

  const commentTotal = edges.length;

  return (
    <View>
      <Pressable
        onPress={() => {
          setTimeout(() => {
            handleClick();
          }, 400);
        }}
      >
        <View style={styles.issuecontainer}>
          <View style={styles.topissuecontainer}>
            <Text style={styles.issuedate}> {issuedate} </Text>
            <View style={styles.repocontainer}>
              <View style={styles.repositorycontainer}>
                <Icon name="git-branch" style={styles.repoicon} />
                <Text style={styles.repositoryname}> {name} </Text>
              </View>
            </View>
            <Status status={state} navigation={navigation}/>
          </View>
          <View style={styles.midissuecontainer}>
            <View style={styles.issuedescriptioncontainer}>
              <Text style={styles.issuetitle}> {title} </Text>
              <View>
                <Text style={styles.issuedescription}>
                  {" "}
                  {shorten(body)}
                  <Text style={styles.issueid}> #{number} </Text>
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.bottomissuecontainer}>
            <View style={styles.usernamecontainer}>
              <Icon name="user" style={styles.initiatoricon} />
              <Text styles={styles.initiatorusername}> {login} </Text>
            </View>
            <View style={styles.commentcontainer}>
              <Icon name="message-circle" style={styles.commenticon} />
              <Text styles={styles.comments}> {commentTotal} Comments</Text>
            </View>
          </View>
          <View style={styles.labelcontainer}>
            {nodes.length !== 0 ? (
              <FlatList
                data={nodes}
                horizontal
                renderItem={({ item }) => (
                  <Label label={item} navigation={navigation} />
                )}
                keyExtractor={(item, index) => {
                  return item.id;
                }}
                onMomentumScrollBegin={() => {
                  onEndReachedCalledDuringMomentum = false;
                }}
                initialNumToRender={10}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              />
            ) : null}
          </View>
        </View>
        <View style={styles.issuespace}></View>
      </Pressable>
    </View>
  );
};


export default Issue;
