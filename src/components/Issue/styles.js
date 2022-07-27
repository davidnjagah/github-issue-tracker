import { StyleSheet, Dimensions, ProgressViewIOSComponent } from "react-native";

const styles = StyleSheet.create({

 issuespace: {
    width: "100%",
    height: 10,
    backgroundColor: "gray",
 },
 issuecontainer:{
   //backgroundColor: "red",
 },
 topissuecontainer: {
   flexDirection: "row",
   marginVertical: 10,
   //backgroundColor: "purple",
   alignItems: "center",
 },
 issuedate: {
   width: "30%",
   marginLeft: 8,
   color: "black",
   fontSize: 14,
 },
 repoicon:{
  marginTop: 5,
  marginLeft: -10,
  },
 repocontainer: {
  alignItems: "center",
  width: "50%",
  marginLeft: -15,
  //backgroundColor: "white", 
 },
 repositorycontainer: {
  flexDirection: "row",   
  paddingLeft: 10,
  flexWrap: "nowrap",   
 },
 repositoryname: {
},
 midissuecontainer: {
   width: "100%",
   marginBottom: 10,
   //backgroundColor: "gray",
 },
 issuestatuscontainer:{
  alignItems: "flex-end",
  width: "20%",
},
issuestatus:{
  //backgroundColor: "green",
  borderRadius: 20,
  marginLeft: -10,
  padding: 5,
},
issuestatustext: {
  color: "white",
  fontSize: 14,
},
 issuetitle: {
  marginBottom: 5,
  fontWeight:  "700",
 },
 issuedescriptioncontainer: {
 left: 10,
 width: "95%",
 //backgroundColor: "white"
 },
 issuedescription: {
 paddingBottom: 10,
 },
 issueid: {
   color: "orange",
 },
 bottomissuecontainer: {
   width: "100%",
   //backgroundColor: "purple",
   flexDirection: "row",
 },
 usernamecontainer: {
   flexDirection: "row",
   //backgroundColor: "white",
   width: "70%",
   paddingLeft: 10,
   flexWrap: "nowrap"
 },
 initiatoricon:{
   marginTop: 5,
 },
 initiatorusername: {
 },
 commentcontainer: {
   flexDirection: "row",
 },
 labelcontainer: {
   //backgroundColor: "green",
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
 comments:{
   flexDirection: "row",
 }, 
 commenticon: {
    marginTop: 4,
 },
});

export default styles;