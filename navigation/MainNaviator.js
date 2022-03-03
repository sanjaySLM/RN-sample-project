import React from "react";
import { NavigationContainer } from "@react-navigation/native";
// import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ListScreen ,{ScreenOptions as ListScreenOptions } from "../screens/ListScreen";
import AddEditScreen ,{ScreenOptions as AddEditScreenOptions } from "../screens/AddEditScreen";

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator options={{headerShown:false}}>
      <Stack.Screen name="List" component={ListScreen} options={ListScreenOptions}  />
      <Stack.Screen name="AddEdit" component={AddEditScreen} options={AddEditScreenOptions}/>
    </Stack.Navigator>
  );
};

const MainNaviator = () => {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};

export default MainNaviator;
