import { StyleSheet, Dimensions, ProgressViewIOSComponent } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 7,
  },
  iconcontainer: {
    padding: 1,
    borderRadius: 1,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 30,
  },
  title: {
    //backgroundColor: "grey",
    width: 20,
    textAlign: "center",
    marginLeft: 5,
  },
  inputcontainer: {
    flex: 1,
    backgroundColor: "grey",
  },
  inputfield: {
    backgroundColor: "white",
    paddingLeft: 5,
    height: 28,
  },
});

export default styles;
