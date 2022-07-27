import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Pressable,
  Button,
  Modal,
} from "react-native";
import { connect } from "react-redux";
import {
  getIssues,
  getMoreIssues,
  getFilteredIssues,
  getUserIssuesStatus,
} from "../../actions/username";
import {
  getMoreRepoIssues,
  getRepositoryIssues,
  getFilteredRepoIssues,
  getRepoIssuesLabels,
} from "../../actions/repository";
import Issue from "../Issue";
import { getSearchIssues, setSearch } from "../../actions/search";
import { setFilterby, setLabel } from "../../actions/main";
import { Picker } from "@react-native-picker/picker";
import filter from "lodash.filter";
import { debounce } from "lodash";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import * as UsernameIssues from "../../graphql/username";
import graphQlClient from "../../graphql/client";

import styles from "./styles";

import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';

import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";


const IssueList = (props) => {
  const {
    loading,
    status,
    Search,
    label,
    search,
    navigation,
    issues,
    username,
    userIssues,
    moreUserIssues,
    repoIssues,
    repository,
    repouser,
    getRepoIssues,
    getMoreRepoIssues,
    reporequest,
    userrequest,
    filterValue,
    getFilteredUserIssues,
    getFilteredRepositoryIssues,
    setFilter,
    setLabelText,
    getRepositoryIssuesLabels,
    getUsernameIssuesStatus,
  } = props;

  const state = {
    data: [...issues.edges],
    error: null,
    query: "",
    fullData: { issues },
    search: false,
    refreshing: false,
  };

  const first = 10;
  const type = "ISSUE";
  const after = null;
  const field = "CREATED_AT";
  const labelnew = null;
  const statusnew = null;

  const backgroundColor = "#171A20CC";
  const textColor = "#FFFFFF";

  const [newData = issues.edges, setNewData] = useState();
  
  const [labelChosen, setLabelChosen] = useState(false);
  console.log("LabelChosen value in IssueList is: " + labelChosen);

  const [localLoading, setLocalLoading] = useState(false);

  useEffect(() => {
    setLocalLoading(false);
    if (label !== null) {
      setLabelChosen(true);
    }
  }, [localLoading, labelChosen]);

  const onChangeSearchInput = (e) => {
    console.log(e);
    
    debouncedSearch(e);
  };

  const debouncedSearch = debounce(function (query) {
    setLocalLoading(true);    
    const data = filter(state.fullData.issues.edges, (issue) => {
      return contains(issue, query);
    });
    Search(query);
    setNewData((prevState) => {
      prevState = data;
      return [...prevState];
    });
  }, 1000);

  const contains = ({ node }, query) => {
    const {
      author: { login },
      repository: { name },
      state,
      title,
    } = node;
    if (
      name.includes(query) ||
      state.includes(query) ||
      login.includes(query) ||
      title.includes(query)
    ) {
      return true;
    }
    return false;
  };

  var afterUser = null;

  var onEndReachedCalledDuringMomentum = true;

  (function () {
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    
    Date.prototype.getMonthName = function () {
      return months[this.getMonth()];
    };
    Date.prototype.getDayName = function () {
      return days[this.getDay()];
    };
  })();

  var now = new Date();

  var day = now.getDayName();
  var month = now.getMonthName();
  var date = new Date().getDate();
  var min = new Date().getMinutes();
  var milli = now.getMilliseconds();

  const handleLoadMore = () => {
    afterUser = issues.pageInfo.endCursor;
    Search("");
    setLocalLoading(true);
    setNewData(issues.edges);
    console.log("Userrequest in LoadMore is: " + userrequest);
    console.log("Reporequest in LoadMore is: " + reporequest);

    if (userrequest == true) {
      if (label !== null) {
        moreUserIssues(username, first, afterUser, filterValue, label);
      } else {
        moreUserIssues(username, first, afterUser, filterValue);
      }
    } else {
      if (label !== null) {
        getMoreRepoIssues(
          repouser,
          repository,
          first,
          afterUser,
          filterValue,
          label
        );
      } else {
        getMoreRepoIssues(repouser, repository, first, afterUser, filterValue);
      }
    }
  };

  const handleLabelClose = () => {
    setLabelText(null);
    setLabelChosen(false);

    if (userrequest == true) {
      userIssues(username, first, after);
    } else {
      getRepoIssues(repouser, repository, first, after);
    }
  };



 NEW_FILE_PATH = "/storage/emulated/0/github/report"+month+day+min+milli+".txt"

 

  let generatePdf = async (html) => {
    const file = await printToFileAsync({
      html: html,
      base64: false
    });

    await shareAsync(file.uri);
  };

  saveFile = async () => {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    if (status === "granted") {
        let fileUri = FileSystem.documentDirectory + "text.txt";
        await FileSystem.writeAsStringAsync(fileUri, "Hello World", { encoding: FileSystem.EncodingType.UTF8 });
        const asset = await MediaLibrary.createAssetAsync(fileUri)
        await MediaLibrary.createAlbumAsync("Download", asset, false)
        console.log("file saved")
    }
  }


  const handleClick = () => {
    //console.log("IssueDescription");
    var fileopen = "";
    var fileclosed = "";
      graphQlClient
        .query({
          query: UsernameIssues.USERNAME_ISSUES_OPEN,
          variables: { username }, 
        })
        .then((result) => {
          const {
            data: { user },
          } = result;
    
          if(user.issues.totalCount == 0){
            alert("No Issues Available");
          }        
          else{ 
            fileopen += "Open Issues are: " + user.issues.totalCount;
          }
        })
        .catch((error) => {
          console.log("error", error);
          alert("Input the Correct Names of the Username and/or Repository", undefined, 2);      
        })
        .finally(() => {
        });

        graphQlClient
        .query({
          query: UsernameIssues.USERNAME_ISSUES_CLOSED,
          variables: { username }, 
        })
        .then((result) => {
          const {
            data: { user },
          } = result;
    
          if(user.issues.totalCount == 0){
            alert("No Issues Available");
          }        
          else{ 
            fileclosed += "Closed Issues are: "+ user.issues.totalCount;
          }
        })
        .catch((error) => {
          console.log("error", error);
          alert("Input the Correct Names of the Username and/or Repository", undefined, 2);      
        })
        .finally(() => {
          // write the file
          const html = `
          <html>
            <body>
              <h1 style= "font-size:50";> GitHub Issue Tracker Report</h1>
              <h2 style= "font-size:30";> Total Number of Issues </h2>
              <p style="font-size:20;">${fileopen}</p>
              <p style="font-size:20;">${fileclosed}</p>
            </body>
          </html>
        `;

          generatePdf(html);
        });
        
  };

  const handleRefresh = () => {
    setNewData(issues.edges);
    if (userrequest == true) {
      userIssues(username, first, after, navigation);
    } else {
      getRepoIssues(repouser, repository, first, after, navigation);
    }
  };

  const filterType = (item) => {
    console.log("LabelChosen value in Filter is: " + labelChosen);
    setFilter(item);
    switch (item) {
      case "CREATED_AT":
        if (userrequest) {
          if (label !== null) {
            getFilteredUserIssues(username, first, after, item, label);
          } else {
            getFilteredUserIssues(username, first, after, item);
          }
        } else {
          if (label !== null) {
            getFilteredRepositoryIssues(
              repouser,
              repository,
              first,
              after,
              item,
              label
            );
          } else {
            getFilteredRepositoryIssues(
              repouser,
              repository,
              first,
              after,
              item
            );
          }
        }
        break;
      case "UPDATED_AT":
        if (userrequest) {
          if (label !== null) {
            getFilteredUserIssues(username, first, after, item, label);
          } else {
            getFilteredUserIssues(username, first, after, item);
          }
        } else {
          if (label !== null) {
            getFilteredRepositoryIssues(
              repouser,
              repository,
              first,
              after,
              item,
              label
            );
          } else {
            getFilteredRepositoryIssues(
              repouser,
              repository,
              first,
              after,
              item
            );
          }
        }
        break;
      case "COMMENTS":
        if (userrequest) {
          if (label !== null) {
            getFilteredUserIssues(username, first, after, item, label);
          } else {
            getFilteredUserIssues(username, first, after, item);
          }
        } else {
          if (label !== null) {
            getFilteredRepositoryIssues(
              repouser,
              repository,
              first,
              after,
              item,
              label
            );
          } else {
            getFilteredRepositoryIssues(
              repouser,
              repository,
              first,
              after,
              item
            );
          }
        }
        break;
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  

  const getHeader = () => {
    return (
      <View>
        <View style={styles.header}>
          <View style={styles.datecontainer}>
            <Text style={styles.present}>Today</Text>
            <Text styles={styles.date}>
              {day}, {date} {month}
            </Text>
          </View>
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
              <View style={styles.modalClose2}>
                <MaterialIcons
                  name="close"
                  size={30}
                  onPress={() => setModalOpen(false)}
                />
              </View>
              <Text style={styles.instructionsTitle}>
                Print Report
              </Text>
              <View style={styles.container2}>
                <Pressable
                  style={[styles.button2, { backgroundColor: backgroundColor }]}
                  onPress={() => {
                    setTimeout(() => {
                      handleClick();
                    }, 40);
                  }}
                >
                  <Text style={[styles.subtitle2, { color: textColor }]}>
                    Print
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
          <Entypo
            name="text-document-inverted"
            size={30}
            style={styles.doc}
            onPress={() => setModalOpen(true)}
          />
          <MaterialIcons
            name="settings"
            size={30}
            style={styles.settings}
            onPress={() => navigation.pop()}
          />
        </View>
        <View style={styles.searchcontainer}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}            
            onChangeText={onChangeSearchInput}
            status="info"            
            placeholder="Search"
            clearButtonMode="always"
            style={styles.searchinput}
            textStyle={{ color: "#000" }}
          />
        </View>
        <ScrollView
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.topbar}>
            <Picker
              selectedValue={filterValue}
              onValueChange={(itemValue, itemIndex) => {
                console.log(itemValue);
                filterType(itemValue);
              }}
              style={styles.dropdown}
            >
              <Picker.Item label="Created At" value="CREATED_AT" />
              <Picker.Item label="Updated At" value="UPDATED_AT" />
              {/* {reporequest == true ? null : ( */}
              <Picker.Item label="Comments" value="COMMENTS" />
              {/* )} */}
            </Picker>
            <View>
              {labelChosen == false ? null : (
                <View style={styles.label}>
                  <Text style={styles.labeltext}>{label}</Text>
                  <View style={styles.labelclosecontainer}>
                    <MaterialIcons
                      name="close"
                      size={19}
                      style={styles.labelclose}
                      onPress={() => handleLabelClose()}
                    />
                  </View>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
        <View style={styles.space}></View>
      </View>
    );
  };

  const getFooter = () => {
    return (
      <View style={styles.loading}>
        {localLoading == false ? null : (
          <View style={styles.indicator}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={[styles.loadingtext]}>Fetching Issues...</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={newData}
        renderItem={({ item }) => (
          <Issue issue={item.node} navigation={navigation} />
        )}
        keyExtractor={(item, index) => {
          return item.node.id;
        }}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum = false;
        }}
        onEndReached={() => {
          if (!onEndReachedCalledDuringMomentum) {
            handleLoadMore();
            onEndReachedCalledDuringMomentum = true;
          }
        }}
        onEndReachedThreshold={0.1}
        initialNumToRender={50}
        ListHeaderComponent={getHeader}
        ListFooterComponent={getFooter}
        extraData={state.search}
        onRefresh={handleRefresh}
        refreshing={state.refreshing}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    filterValue: state.main.filter,
    status: state.main.status,
    label: state.main.label,
    loading: state.main.loading,
    search: state.search.search,
    userrequest: state.username.userRequest,
    reporequest: state.repository.repoRequest,
    username: state.username.username,
    repository: state.repository.repository.repository,
    repouser: state.repository.repository.username,
    moreIssues: state.username.moreIssues,
    repoIssues: state.repository.repositoryIssues,
    issues:
      state.username.userRequest == true
        ? state.username.userIssues
        : state.repository.repositoryIssues,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userIssues: (username, first, after, navigation) => {
      dispatch(getIssues(username, first, after, navigation));
    },
    getsearchIssues: (labels, first, after, type) => {
      dispatch(getSearchIssues(labels, first, after, type));
    },
    moreUserIssues: (username, first, after, field, labels) => {
      dispatch(getMoreIssues(username, first, after, field, labels));
    },
    getFilteredUserIssues: (username, first, after, field, labels) => {
      dispatch(getFilteredIssues(username, first, after, field, labels));
    },
    getUsernameIssuesStatus: (username, first, after, field, labels) => {
      dispatch(getUserIssuesStatus(username, first, after, field, labels));
    },
    getRepoIssues: (username, repository, first, after, navigation) => {
      dispatch(
        getRepositoryIssues(username, repository, first, after, navigation)
      );
    },
    getMoreRepoIssues: (username, repository, first, after, field, label) => {
      dispatch(
        getMoreRepoIssues(username, repository, first, after, field, label)
      );
    },
    getRepositoryIssuesLabels: (
      username,
      repository,
      first,
      after,
      field,
      labels
    ) => {
      dispatch(
        getRepoIssuesLabels(username, repository, first, after, field, labels)
      );
    },
    getFilteredRepositoryIssues: (
      username,
      repository,
      first,
      after,
      field,
      labels
    ) => {
      dispatch(
        getFilteredRepoIssues(username, repository, first, after, field, labels)
      );
    },
    Search: (search) => {
      dispatch(setSearch(search));
    },
    setFilter: (filter) => {
      dispatch(setFilterby(filter));
    },
    setLabelText: (label) => {
      dispatch(setLabel(label));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IssueList);
