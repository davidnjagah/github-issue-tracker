import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  Modal,
} from "react-native";
import styles from "./styles";
import TextInputField from "../TextInputField/index";
import { getIssues, userRequest } from "../../actions/username";
import {
  getRepositoryIssues,
  repositoryRequest,
} from "../../actions/repository";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import { setStatus, setFilterby, setLabel } from "../../actions/main";
import { MaterialIcons, Entypo } from "@expo/vector-icons";

const first = 10;
const after = null;
const field = "CREATED_AT";
const labelnew = null;
const statusnew = null;

const LogIn = (props) => {
  const {
    loading,
    navigation,
    userrequest,
    reporequest,
    setFilter,
    setNewLabel,
    setNewStatus,
    setRepoRequest,
    setUserRequest,
  } = props;

  const [modalOpen, setModalOpen] = useState(false);


  logInSubmit = (values) => {
    setFilter(field);
    setNewLabel(labelnew);
    setNewStatus(statusnew);
    setRepoRequest(false);
    setUserRequest(false);
    values.repository == ""
      ? props.getUserIssues(values.username, first, after, navigation)
      : props.getRepoIssues(
          values.username,
          values.repository,
          first,
          after,
          navigation
        );
    navigation.navigate("IssuePage");
  };

  
  const backgroundColor = "#171A20CC";
  const textColor = "#FFFFFF";

  return (
    <KeyboardAwareScrollView>
      <View style={styles.page}>
        <View style={styles.logo}>
          <Image
            source={require("../../../assets/Logo_512x512.png")}
            style={styles.image}
          />
        </View>
        <Text style={styles.title}>Welcome to the GitHub issue Tracker</Text>
        
        <Modal
          visible={modalOpen}
          transparent={true}
          animationType="slide"
          style={styles.instructionsBoxModal}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={styles.instructionsBox}>
              <View style={styles.modalClose}>
                <MaterialIcons
                  name="close"
                  size={30}
                  onPress={() => setModalOpen(false)}
                />
              </View>
              <Text style={styles.instructionsTitle}>
                ISSUE TRACKING DETAILS
              </Text>
              <Text style={styles.instructions}>
                <Entypo name="dot-single" size={14} color="black" />
                To view the issues related to a specific user account input the
                account Username only. e.g {"\n"}
                <Text style={[styles.instructions, { fontWeight: "700"}]}>                  
                  username: visiky
                </Text>
              </Text>
              <Text style={styles.instructions}>
              {"\n"}
                <Entypo
                  name="dot-single"
                  size={14}
                  color="black"
                  style={styles.dot}
                />
                To view the issues related to a certain repository input the
                Username of the repository owner and the repository name. e.g {"\n"}
                <Text style={[styles.instructions, { fontWeight: "700"}]}>                  
                  username: apollographql{"\n"}
                  repository name: apollo-client
                </Text>
              </Text>
              <Text style={styles.instructions}>
              {"\n"}
                <Entypo name="dot-single" size={14} color="black" />
                No need to include uppercase letters in the names.
              </Text>
            </View>
          </View>
        </Modal>
        <View style={styles.infocirclecontainer}>
        <Entypo
          name="info-with-circle"
          size={22}
          style={styles.infomodal}
          onPress={() => setModalOpen(true)}
        />
        </View>
        <Formik
          initialValues={{ username: "", repository: "" }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              logInSubmit(values);
              setSubmitting(false);
            }, 400);
          }}
        >
          {(props) => (
            <View>
              <View style={styles.inputcontainer}>
                <TextInputField
                  icon="user"
                  placeholder="Github Username"
                  value={props.values.username}
                  onChangeText={props.handleChange("username")}
                />
                <TextInputField
                  icon="git-branch"
                  placeholder="Enter Repository Name"
                  value={props.values.repository}
                  onChangeText={props.handleChange("repository")}
                />
              </View>
              <View style={styles.container}>
                <Pressable
                  style={[styles.button, { backgroundColor: backgroundColor }]}
                  onPress={props.handleSubmit}
                >
                  <Text style={[styles.subtitle, { color: textColor }]}>
                    View
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.main.loading,
    userrequest: state.username.userRequest,
    reporequest: state.repository.repoRequest,
  };
};

const mapDispatchToProps = (dispatch) => {
  //have the least dispatches here for memory purposes
  return {
    getUserIssues: (username, first, after, navigation) => {
      dispatch(getIssues(username, first, after, navigation));
    },
    getRepoIssues: (username, repository, first, after, field, navigation) => {
      dispatch(
        getRepositoryIssues(
          username,
          repository,
          first,
          after,
          field,
          navigation
        )
      );
    },
    setFilter: (filter) => {
      dispatch(setFilterby(filter));
    },
    setNewLabel: (label) => {
      dispatch(setLabel(label));
    },
    setNewStatus: (status) => {
      dispatch(setStatus(status));
    },
    setRepoRequest: (Reporequest) => {
      dispatch(repositoryRequest(Reporequest));
    },
    setUserRequest: (Userrequest) => {
      dispatch(userRequest(Userrequest));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
