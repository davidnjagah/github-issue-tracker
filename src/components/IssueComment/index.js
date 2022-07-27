import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import styles from "./styles";
import { Feather as Icon } from "@expo/vector-icons";
import Markdown from 'react-native-markdown-package';
import { insertMentionLinks } from "../../utils/stringUtils";
import {
  useFonts,
  CourierPrime_400Regular as Courier,
} from '@expo-google-fonts/courier-prime';
import {
  SpaceMono_400Regular as Monospace,
} from '@expo-google-fonts/space-mono';

const IssueComment = (props) => {
  const {
    author: { login },
    body,
  } = props.comment;

  let [fontsLoaded] = useFonts({
    Courier,
    Monospace,
  });

  const markdownStyle = {
    singleLineMd: {
      text: {
        color: 'blue',
        textAlign: "right"
      },
      view: {
        alignSelf: 'stretch',
      }
    },
    collectiveMd: {
      heading1: {
        color: '#0264bf'
      },
      heading2: {
        color: '#0071b8',
        fontSize: 18
      },
      strong: {
        color: 'blue'
      },
      em: {
        color: 'cyan'
      },
      text: {
        color: 'black',
      },
      blockQuoteText: {
        color: '#003194',
        padding: 10,
      },
      blockQuoteSection: {
        flexDirection: 'row',
      },
      blockQuoteSectionBar: {
        width: 3,
        height: null,
        backgroundColor: '#DDDDDD',
        marginRight: 10,
      },
      codeBlock: {
        fontFamily: Platform.OS === 'ios' ? 'Courier' : 'Monospace',
        fontWeight: '500',
        backgroundColor: '#91bbff',
        padding: 10,
      },
      tableHeader: {
        backgroundColor: 'blue',
      },
    }
  };

  if (!fontsLoaded) {
    return( 
      <View style={styles.indicator}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
      );
  } else {
  return (
    <View style={styles.commentcontainer}>
      <View style={styles.author}>
        <Icon name="user" style={styles.usericon} />
        <Text style={styles.authorname}>{login}</Text>
      </View>
      <View style={styles.commenttext}>
        <Markdown 
          styles={markdownStyle.collectiveMd} 
          onLink={(url) => Linking.openURL(url)}
        >   
          {body}
        </Markdown>
        </View>
    </View>
  );
  }
};

export default IssueComment;
