import React from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Linking,
  Platform,
  ActivityIndicator,
  VirtualizedList,
} from "react-native";
import styles from "./styles";
import Markdown from "react-native-markdown-package";
import { Feather as Icon } from "@expo/vector-icons";
import IssueComment from "../IssueComment";
import "intl";
import "intl/locale-data/jsonp/en";
import Label from "../Label";
import Status from "../Status";
import { insertMentionLinks } from "../../utils/stringUtils";
import {
  useFonts,
  CourierPrime_400Regular as Courier,
} from "@expo-google-fonts/courier-prime";
import { SpaceMono_400Regular as Monospace } from "@expo-google-fonts/space-mono";

const IssueDescriptionPage = (props) => {
  const { navigation } = props;

  const { params } = navigation.state;

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
  } = params;

  let [fontsLoaded] = useFonts({
    Courier,
    Monospace,
  });

  if ("__setDefaultTimeZone" in Intl.DateTimeFormat) {
    Intl.DateTimeFormat.__setDefaultTimeZone("America/Los_Angeles");
  }

  let issuedate = Date.parse(createdAt);
  let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(issuedate);
  let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(issuedate);
  let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(issuedate);
  issuedate = `${da}-${mo}-${ye}`;

  const getItem = (data, index) => ({
    id: Math.random().toString(12).substring(0),
    title: `Item ${++index}`,
  });

  const getItemCount = (data) => 1;

  const markdownStyle = {
    singleLineMd: {
      text: {
        color: "blue",
        textAlign: "right",
      },
      view: {
        alignSelf: "stretch",
      },
    },
    collectiveMd: {
      heading1: {
        color: "#0264bf",
      },
      heading2: {
        color: "#0071b8",
        fontSize: 18,
      },
      strong: {
        color: "blue",
      },
      em: {
        color: "cyan",
      },
      text: {
        color: "black",
      },
      blockQuoteText: {
        color: "grey",
      },
      blockQuoteSection: {
        flexDirection: "row",
      },
      blockQuoteSectionBar: {
        width: 3,
        height: null,
        backgroundColor: "#DDDDDD",
        marginRight: 15,
      },
      codeBlock: {
        fontFamily: Platform.OS === "ios" ? "Courier" : "Monospace",
        fontWeight: "500",
        backgroundColor: "#91bbff",
        padding: 10,
      },
      tableHeader: {
        backgroundColor: "grey",
      },
    },
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#000FFF" />
        <Text style={styles.subtitle}>Loading Issue...</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.page}>
        <ScrollView style={styles.scroller}>
          <View style={styles.toppage}>
            <Text style={styles.title}> {title} </Text>
            <View style={styles.statuscontainer}>
              <Status status={state} navigation={navigation} />
            </View>
            <View style={styles.statusrepocontainer}>
              <View style={styles.issuenumbercontainer}>
                <Text style={styles.issuenumber}> #{number}</Text>
              </View>
              <View style={styles.repocontainer}>
                <View style={styles.repositorycontainer}>
                  <Icon name="git-branch" style={styles.repoicon} />
                  <Text style={styles.repository}> {name}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.midpage}>
            <View style={styles.decriptioncontainer}>
              <View style={styles.description}>
                <Markdown
                  styles={markdownStyle.collectiveMd}
                  onLink={(url) => Linking.openURL(url)}
                >
                  {insertMentionLinks(body)}
                </Markdown>
              </View>
            </View>
            <View style={styles.dateinitiatorcontainer}>
              <View style={styles.datecontainer}>
                <Text style={styles.date}>{issuedate}</Text>
              </View>
              <View style={styles.initiatorcontainer}>
                <Icon name="user" style={styles.initiatoricon} />
                <Text style={styles.initiator}>{login}</Text>
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
                  initialNumToRender={10}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                />
              ) : null}
            </View>
          </View>
          <View style={styles.bottompage}>
            <View style={styles.commenttitlecontainer}>
              <Text styles={styles.commenttitle}> Comments </Text>
              <Icon name="message-circle" style={styles.commenticon} />
            </View>
            {console.log("*******************")}
            {console.log("New Comment Section")}
            {console.log("*******************")}
            {edges.map((commentlist) => {
              return (                
              <View key={commentlist.node.id}>
                {console.log(commentlist.node.id)}            
                <IssueComment comment={commentlist.node}/>
              </View>
              );
            })}
          </View>
          <View style={styles.bottomspace}></View>
        </ScrollView>
      </View>
    );
  }
};

export default IssueDescriptionPage;
