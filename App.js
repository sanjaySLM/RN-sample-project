import { registerRootComponent } from "expo";
import React from "react";
import { StyleSheet, SafeAreaView ,StatusBar  } from 'react-native';
import MainNaviator from "./navigation/MainNaviator";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { rootReducer } from "./store/reducer/Root-reducer";

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <MainNaviator />
      </Provider>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
});

registerRootComponent(App);
