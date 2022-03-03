import React, { useReducer, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  Button,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import RadioButton from "../components/RadioButton";
import Checkbox from "../components/Checkbox";
import Picker from "../components/Picker";
import { AntDesign } from "@expo/vector-icons";
import {
  addEmployeeData,
  editEmployeeData,
} from "../store/action/Employee-action";

export const ADD_DATA = "ADD_DATA";
const formReducer = (state, action) => {
  switch (action.type) {
    case ADD_DATA:
      const updatedInputValue = {
        ...state.inputValues,
        [action.key]: action.value,
      };
      const updatedInputValidities = {
        ...state.inputValidities,
        [action.key]: action.isValid,
      };
      let updatedFormIsValid = true;
      for (const key in updatedInputValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedInputValidities[key];
      }
      return {
        ...state,
        inputValues: updatedInputValue,
        inputValidities: updatedInputValidities,
        formStateIsValid: updatedFormIsValid,
      };
  }
};

const AddEditScreen = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { editbleId } = route.params;

  // Retrieving Datas from Store
  const editableEmployee = useSelector((state) =>
    state.AddReducer.Data.find((employee) => employee.id === editbleId)
  );
  const radioButtonData = useSelector(
    (state) => state.AddReducer.RadioButtonData
  );
  const checkboxData = useSelector((state) => state.AddReducer.CheckboxData);
  const pickerData = useSelector((state) => state.AddReducer.PickerData);

  //Intial state using UseReducer Hook
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      name: editableEmployee ? editableEmployee.name : null,
      radioButtonData: editableEmployee
        ? editableEmployee.radioData
        : radioButtonData,
      checkboxData: editableEmployee
        ? editableEmployee.checkboxData
        : checkboxData,
      pickerData: editableEmployee ? editableEmployee.pickerData : pickerData,
    },
    inputValidities: {
      name: editableEmployee ? true : false,
      radioButtonData: editableEmployee ? true : false,
      checkboxData: editableEmployee ? true : false,
      pickerData: editableEmployee ? true : false,
    },
    formStateIsValid: editableEmployee ? true : false,
  });

  //values Dispatching to Reducer Functionality
  const textChangeHandler = (inputKey, text) => {
    let isValid = false;
    if (text.length > 0) {
      isValid = true;
    }
    dispatchFormState({
      type: "ADD_DATA",
      value:
        inputKey === "radioButtonData" ||
        inputKey === "checkboxData" ||
        inputKey === "pickerData"
          ? text
          : text.charAt(0).toUpperCase() + text.slice(1),
      isValid: isValid,
      key: inputKey,
    });
  };

  // Save while Adding and Editing Datas
  const submitHandler = () => {
    if (!editableEmployee) {
      if (formState.formStateIsValid) {
        dispatch(
          addEmployeeData(
            formState.inputValues.name,
            formState.inputValues.pickerData,
            formState.inputValues.radioButtonData,
            formState.inputValues.checkboxData
          )
        );
        navigation.navigate("List");
      } else {
        Alert.alert("Sorry", "Don't send empty Values", [{ text: "OK" }]);
      }
    } else {
      if (formState.formStateIsValid) {
        dispatch(
          editEmployeeData(
            editableEmployee.id,
            formState.inputValues.name,
            formState.inputValues.pickerData,
            formState.inputValues.radioButtonData,
            formState.inputValues.checkboxData
          )
        );
        navigation.navigate("List");
      } else {
        Alert.alert("Sorry", "Don't send empty Values", [{ text: "OK" }]);
      }
    }
  };

  // Radio Button Functionality
  const onRadioBtnClick = (item) => {
    let updatedState = formState.inputValues.radioButtonData.map(
      (isLikedItem) =>
        isLikedItem.id === item.id
          ? { ...isLikedItem, selected: true }
          : { ...isLikedItem, selected: false }
    );
    textChangeHandler("radioButtonData", updatedState);
  };

  // Checkbox Functionality
  const onCheckboxBtnClick = (item) => {
    let updatedState = formState.inputValues.checkboxData.map((isLikedItem) =>
      isLikedItem.id === item.id
        ? { ...isLikedItem, selected: !item.selected }
        : { ...isLikedItem }
    );
    textChangeHandler("checkboxData", updatedState);
  };

  // Picker Functionality
  const [picker, setPicker] = useState(false);
  const onPickerBtnClick = (item) => {
    setPicker(false);
    let updatedState = formState.inputValues.pickerData.map((isLikedItem) =>
      isLikedItem.id === item.id
        ? { ...isLikedItem, selected: true }
        : { ...isLikedItem, selected: false }
    );
    textChangeHandler("pickerData", updatedState);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <View style={styles.boxCointainer}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Name :</Text>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                value={formState.inputValues.name}
                autoCapitalize={"words"}
                onChangeText={textChangeHandler.bind(this, "name")}
              />
            </View>
          </View>
          <View
            style={{
              width: "95%",
              flexDirection: "row",
              margin: "3%",
              alignItems: "center",
            }}
          >
            <View style={styles.textContainer}>
              <Text style={styles.text}>Gender :</Text>
            </View>
            <View
              style={{
                borderColor: "black",
                borderBottomWidth: 1,
                width: "70%",
                paddingHorizontal: "2.5%",
                marginLeft: "3%",
                paddingBottom: "1.5%",
              }}
            >
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 25 }}>
                  {formState.inputValues.pickerData.find(
                    (element) => element.selected === true
                  )
                    ? formState.inputValues.pickerData.find(
                        (element) => element.selected === true
                      ).value
                    : "--select--"}
                </Text>
                {picker ? (
                  <AntDesign
                    name="up"
                    size={27}
                    color="black"
                    onPress={() => {
                      setPicker(!picker);
                    }}
                  />
                ) : (
                  <AntDesign
                    name="down"
                    size={27}
                    color="black"
                    onPress={() => {
                      setPicker(!picker);
                    }}
                  />
                )}
              </View>
              {picker && (
                <Picker
                  pickerData={formState.inputValues.pickerData}
                  onPress={onPickerBtnClick}
                />
              )}
            </View>
          </View>
          <View style={{ width: "94%", margin: "3%" }}>
            <Text style={styles.text}>Which team do you Belong to?</Text>
            {formState.inputValues.radioButtonData.map((item) => (
              <RadioButton
                onPress={() => onRadioBtnClick(item)}
                selected={item.selected}
                key={item.id}
              >
                {item.name}
              </RadioButton>
            ))}
          </View>

          <View style={{ width: "94%", margin: "3%" }}>
            <Text style={styles.text}>Languages Known</Text>
            {formState.inputValues.checkboxData.map((item) => (
              <Checkbox
                onPress={() => onCheckboxBtnClick(item)}
                selected={item.selected}
                key={item.id}
              >
                {item.name}
              </Checkbox>
            ))}
          </View>
          <View
            style={{
              width: "80%",
              marginHorizontal: "10%",
              marginVertical: "3%",
            }}
          >
            <Button
              title="Submit"
              color="black"
              onPress={() => {
                submitHandler();
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 25,
  },
  boxCointainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: "2.5%",
    marginVertical: "3%",
    width: "95%",
  },
  textInput: {
    height: 50,
    borderColor: "black",
    borderWidth: 1,
    marginVertical: "3%",
    marginHorizontal: "3%",
    fontSize: 25,
    paddingHorizontal: 5,
  },
  textContainer: {
    width: "25%",
    alignItems: "center",
  },
  textInputContainer: {
    width: "75%",
  },
});

export const ScreenOptions = (navData) => {
  const title = navData.route.params ? navData.route.params.hearderName : "";
  return {
    headerTitle: title,
  };
};
export default AddEditScreen;
