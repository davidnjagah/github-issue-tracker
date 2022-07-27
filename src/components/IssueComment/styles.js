import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  commentcontainer: {
    width: "94%",
    backgroundColor: "#9699a3",
    alignSelf: "center",
    margin: 10,
    paddingVertical: 10,
  },
  author: {
    flexDirection: "row",
    marginBottom: 10
  },
  usericon: {
    marginHorizontal: 10,
    marginTop: 3,
    fontSize: 14,
    color: 'black'
  },
  authorname: {
    flexDirection: "row",
    color: 'black',
    fontSize: 16,
  },
  commenttext: {
    marginHorizontal: 10,
  },
  indicator: {
    padding: 30,
  },
  loadingtext: {
    fontSize: 16,
    textAlign: "center",
  },
  });

export default styles;