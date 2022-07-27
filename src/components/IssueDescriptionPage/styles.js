import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  page: {
    height: Dimensions.get("window").height,
    width: "100%",
  },
  scroller: {
    marginBottom: 100,
  },
  toppage: {
    width: "100%",
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 30,
    padding: 20,
  },
  statusrepocontainer: {
    flexDirection: "row",
  },
  statuscontainer: {
    alignItems: "center",
    width: "100%",
    paddingBottom: 20,
  },
  issuestatuscontainer: {
    alignItems: "center",
    width: "20%",
  },
  issuenumbercontainer: {
    width: "20%",
  },
  issuenumber: {
    marginLeft: 10,
  },
  repocontainer: {
    width: "80%",
    alignItems: "flex-end",
  },
  repoicon:{
    marginTop: 5,
    marginLeft: -10,
    },
  repositorycontainer: {
    flexDirection: "row",   
    paddingLeft: 10,
    flexWrap: "nowrap",   
    },
  repository: {
    marginRight: 10,
  },
  midpage: {
    marginBottom: 0,
  },
  descriptioncontainer: {
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    marginHorizontal: 10,
  },
  dateinitiatorcontainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  datecontainer: {
    width: "50%",
  },
  date: {
    marginLeft: 10,
  },
  initiatorcontainer: {
    width: "50%",
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  initiator: {
    marginRight: 10,
    marginLeft: 5,
  },
  loading:{
    height: Dimensions.get("window").height,
    width: "100%",
    flex: 1,
    padding: 20,
    marginTop: -100,
    alignItems: "center",
    justifyContent: "center",
  },
  subtitle:{
    fontSize: 16,
    alignItems: 'center',
    marginTop: 15
  },
  initiatoricon:{
    marginTop: 5,
  },
  labelcontainer: {
    alignItems: "flex-start",
    paddingVertical: 10,
  },
  label: {
    paddingHorizontal: 7,
    backgroundColor: "yellow",
    borderRadius: 10,
    marginHorizontal: 10,
  },
  labeltext: {
    color: "black",
    fontSize: 14,
  },
  bottompage: {
    marginTop: 0,
  },
  commenttitlecontainer: {
    flexDirection: "row",
    width: 100,
    marginLeft: 10,
  },
  commenttitle: {},
  commenticon: {
    marginTop: 4,
  },
  bottomspace: {
    width: "100%",
    height: 50,
  }
});

export default styles;
