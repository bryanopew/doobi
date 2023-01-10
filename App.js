import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";

import RootStackNav from "~/navigators/RootStackNav";
import { store } from "~/stores/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <StatusBar style="auto" /> */}
        <RootStackNav />
      </NavigationContainer>
    </Provider>
  );
}
