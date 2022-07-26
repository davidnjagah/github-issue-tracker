import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: Dimensions.get("window").height - 80,
  },
  header: {
    width: "100%",
    height: 60,
    marginBottom: 0,
    flexDirection: "row",
    //backgroundColor: "gray",
  },
  labelcontainer: {
    //backgroundColor: "green",
    alignItems: "flex-start",
    paddingVertical: 10,
  },
  label: {
    flexDirection: "row",
    paddingHorizontal: 7,
    backgroundColor: "#3d005e",
    borderRadius: 7,
    marginHorizontal: 5,
    padding: 3,
    borderColor: "gray",
    borderWidth: 1,
  },
  labelclosecontainer: {
    justifyContent: "center"
  },
  labelclose: {
    color: "white",
    marginStart: 4,
  },
  labeltext: {
    color: "white",
    fontSize: 14
  },
  modalcontainer: {
    width: "100%",
    height: Dimensions.get("window").height,
    ///justifyContent: "center",
    backgroundColor: "cyan",
    opacity: 1,
  },
  modalClose: {
    alignItems: "flex-end",
    height: 200,
    marginTop: 20,
    marginRight: 15,
  },
  modalTouch: {
    width: "100%",
    height: "100%",
    opacity: 1,
  },
  title: {
    textAlign: "center",
    fontWeight: "700",
    marginTop: 20,
    fontSize: 18,
  },
  loading: {
    width: "100%",
    height: 100,
    flex: 1,
    padding: 10,
    justifyContent: "flex-start",
    //marginVertical: 10,
    //backgroundColor: "blue",
  },
  loading2:{
    height: Dimensions.get("window").height,
    width: "100%",
    flex: 1,
    padding: 20,
    marginTop: -100,
    alignItems: "center",
    position: "absolute",
    justifyContent: "center",
  },
  searchinput: {
    borderRadius: 25,
    height: 35,
    borderWidth: 0.5,
    borderColor: "#3333",
    paddingLeft: 15,
    backgroundColor: "#fff",
  },
  loadingtext: {
    fontSize: 16,
    textAlign: "center",
  },
  refresh: {
    width: "100%",
    height: 30,
    flex: 1,
    padding: 10,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: "blue",
  },
  indicator: {
    padding: 10,
  },
  noissues: {
    width: "100%",
    height: 50,
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: "blue",
  },
  doc: {
    alignSelf: "center",
    marginLeft: -40,
    paddingRight: 10
  },
  settings: {
    alignSelf: "center",
    marginRight: 10,
  },
  datecontainer: {
    padding: 5,
    width: "88%",
  },
  present: {
    fontSize: 20,
  },
  date: {
    fontSize: 7,
  },
  searchcontainer: {
    height: 50,
    width: "100%",
    position: "relative",
    //backgroundColor: '#fff',
    //padding: 10,
    //alignItems: 'center',
    justifyContent: "center",
    padding: 10,
  },
  containerstyle: {
    height: 50,
    backgroundColor: null,
  },
  infomodal:{
    marginRight: 40,
    marginTop: 10,
  },
  modalClose2: {
    alignItems: "flex-end",
    marginTop: 5,
    marginRight: 15,
  },
  infocirclecontainer:{
    width: "100%",
    alignItems: "flex-end",
  },
  instructionsBoxModal: {
    margin: 0,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  instructionsBox: {
    width: "80%",
    alignSelf: "center",
    backgroundColor: 'white',
    paddingHorizontal: 10,
    //paddingVertical: 5,
    paddingBottom: 40,
    marginVertical: 10,
  },
  instructionsTitle: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "700",
    color: "black",
  },
  dot:{
    marginTop: 3,
  },
  instructions: {
    fontSize: 14,
    textAlign: "left",
    color: "black",
  },
  button:{
    height: 40,
    justifyContent: 'center',
    borderRadius: 20,
    alignItems: 'center',
  },
  container2:{
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  subtitle2:{
    fontSize: 16,
    alignItems: 'center',
    textTransform: 'uppercase',
    //fontWeight: '500',
  },
  button2:{
    height: 40,
    justifyContent: 'center',
    borderRadius: 20,
    alignItems: 'center',
  },
  inputcontainerstyle: {
    height: 30,
  },
  topbar: {
    height: 30,
    alignItems: "center",
    marginRight: 10,
    width: "100%",
    marginTop: 0,
    marginBottom: 10,
    position: "relative",
    //backgroundColor: "gray",
    paddingLeft: 0,
    flexDirection: "row",
  },
  dropdown: {
    width: 150,
    height: 30,
    marginLeft: 10,
    flexDirection: "row",
    //backgroundColor: "gray",
  },
  space: {
    width: "100%",
    height: 20,
    backgroundColor: "gray",
  },
  issuespace: {
    width: "100%",
    height: 10,
    backgroundColor: "gray",
    marginTop: 15,
    marginBottom: 10,
  },
  issuelistbox: {
    marginTop: 10,
    width: "100%",
    //backgroundColor: "blue",
  },
  subtitle: {
    fontSize: 16,
    alignItems: "center",
    //textTransform: 'uppercase',
    //fontWeight: '500',
  },
  button: {
    height: 40,
    width: "100%",
    justifyContent: "center",
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
  },
  inputcontainer: {
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    height: 100,
    paddingTop: 20,
    marginTop: "5%",
    //position: "absolute"
  },
  containerlogin: {
    width: "100%",
    padding: 20,
  },
});

export default styles;
