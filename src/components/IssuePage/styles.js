import { StyleSheet, Dimensions, ProgressViewIOSComponent } from "react-native";

const styles = StyleSheet.create({
  page: {
    height: Dimensions.get("window").height,
    width: "100%",
    //backgroundColor: "cyan",
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
    textTransform: 'uppercase',
    marginTop: 15
    //fontWeight: '500',
  },
});

export default styles;
