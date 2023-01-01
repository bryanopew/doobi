import React, { useEffect, useRef, useState, Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
  Button,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import styled from "styled-components/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CheckBox from "@react-native-community/checkbox";
import { useSelector, useDispatch } from "react-redux";
// import { checkAll } from "~/Stores/slices/checkBoxSlice";

const styles = StyleSheet.create({
  textInput: {
    borderColor: "black",
    borderWidth: 1,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
});

const CheckBoxAndroid = () => {
  const [state, setState] = useState(false);
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <CheckBox
        value={state}
        onValueChange={(value) => {
          setState(value);
          dispatch(checkAll(value));
        }}
        tintColors={{ true: "#30D158" }}
      />
    </View>
  );
};

export default CheckBoxAndroid;
