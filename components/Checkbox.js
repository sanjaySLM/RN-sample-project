import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const Checkbox = ({ onPress, selected, children }) => {
  return (
    <View style={styles.radioButtonContainer}>
        {selected ? (
          <Ionicons name="md-checkbox" onPress={onPress} size={24}  color="black" />
        ) : (
          <MaterialCommunityIcons
            name="checkbox-blank-outline"
            size={24}
            color="black"
            onPress={onPress}
          />
        )}
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.radioButtonText}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "4%",
    marginVertical: "0.8%",
  },
  radioButton: {
    height: 20,
    width: 20,
    backgroundColor: "skyblue",
    // borderWidth: 1,
    // borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonIcon: {
    height: 14,
    width: 14,
    backgroundColor: "black",
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 16,
  },
});
export default Checkbox;
