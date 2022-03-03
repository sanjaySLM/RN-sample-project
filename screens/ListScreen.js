import React from "react";
import { Text, View, StyleSheet, FlatList, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Entypo,
} from "@expo/vector-icons";
import { deleteEmployeeData } from "../store/action/Employee-action";

const ListScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const renderedData = useSelector((state) => state.AddReducer.Data);
  const editHandler = (id) => {
    navigation.navigate({
      name: "AddEdit",
      params: { hearderName: "Edit Data", editbleId: id },
    });
  };
  const deleteHandler = (id) => {
    Alert.alert("Are You Sure", "Do you want to delete?", [
      {
        text: "Cancel",
      },
      {
        text: "OK",
        onPress: () => {
          dispatch(deleteEmployeeData(id));
        },
      },
    ]);
  };

  const renderedItemData = ({ item, index }) => {
    let checkboxValues = item.checkboxData.filter(
      (element) => element.selected === true
    );
    return (
      <View style={styles.mainContainer}>
        <View style={styles.dataContainer}>
          <View style={styles.listContainer}>
            <View style={styles.titleText}>
              <Text>ID</Text>
            </View>
            <View style={styles.statusText}>
              <Text>{item.id}</Text>
            </View>
          </View>
          <View style={styles.listContainer}>
            <View style={styles.titleText}>
              <Text>NAME</Text>
            </View>
            <View style={styles.statusText}>
              <Text>{item.name}</Text>
            </View>
          </View>
          <View style={styles.listContainer}>
            <View style={styles.titleText}>
              <Text>GENDER</Text>
            </View>
            <View style={styles.statusText}>
              <Text>
                {
                  item.pickerData.find((element) => element.selected === true)
                    .value
                }
              </Text>
            </View>
          </View>
          <View style={styles.listContainer}>
            <View style={styles.titleText}>
              <Text>TEAM</Text>
            </View>
            <View style={styles.statusText}>
              <Text>
                {
                  item.radioData.find((element) => element.selected === true)
                    .value
                }
              </Text>
            </View>
          </View>
          <View style={styles.listContainer}>
            <View style={styles.titleText}>
              <Text>SKILL</Text>
            </View>
            <View style={styles.statusText}>
              {checkboxValues.map((object, index) => {
                return <Text key={index}>{object.name},</Text>;
              })}
            </View>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <FontAwesome5
            name="user-edit"
            size={40}
            color="black"
            onPress={() => {
              editHandler(item.id);
            }}
          />
          <MaterialCommunityIcons
            name="delete"
            size={50}
            color="black"
            onPress={() => {
              deleteHandler(item.id);
            }}
          />
        </View>
      </View>
    );
  };
  if (renderedData.length === 0) {
    return (
      <View style={styles.noDataAvailableCointainer}>
        <Text style={{ color: "red" }}>NO DATA AVAILABLE</Text>
        <Text>Click Add Icon to add data</Text>
        <View style={{ marginVertical: "2%" }}>
          <Button
            title="Add Data"
            color="black"
            onPress={() => {
              navigation.navigate({
                name: "AddEdit",
                params: { hearderName: "Add Data" },
              });
            }}
          />
        </View>
      </View>
    );
  }
  return (
    <View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={renderedData}
        renderItem={renderedItemData}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    borderColor: "black",
    borderWidth: 1,
    margin: "1%",
    flexDirection: "row",
    padding: "1.5%",
  },
  dataContainer: {
    width: "60%",
  },
  iconContainer: {
    width: "40%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  text: {
    fontSize: 15,
  },
  listContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "black",
    borderBottomWidth: 0.2,
    borderRightWidth: 0.2,
  },
  titleText: {
    width: "40%",
    justifyContent: "center",
  },
  statusText: {
    width: "60%",
  },
  noDataAvailableCointainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

export const ScreenOptions = (navData) => {
  return {
    headerTitle: "List",
    headerRight: () => (
      <View style={{ marginHorizontal: "5%" }}>
        <Entypo
          name="add-user"
          size={24}
          color="black"
          onPress={() => {
            navData.navigation.navigate({
              name: "AddEdit",
              params: { hearderName: "Add Data" },
            });
          }}
        />
      </View>
    ),
  };
};

export default ListScreen;
