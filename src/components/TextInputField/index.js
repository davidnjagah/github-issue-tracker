import React from "react";
import { TextInput, View } from "react-native";
import styles from "./styles";
import { Feather as Icon } from "@expo/vector-icons";

const TextIputField = ({
  icon,
  placeholder,
  value,
  onChangeText,
  ...props
}) => {
  const color = "rgba(52, 52, 52, 0.7)";
  return (
    <View style={styles.container}>
      <View style={styles.iconcontainer}>
        <Icon name={icon} style={styles.title} />
        <View style={styles.inputcontainer}>
          <TextInput
            style={styles.inputfield}
            placeholderTextColor={color}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            {...props}
          />
        </View>
      </View>
    </View>
  );
};

export default TextIputField;
