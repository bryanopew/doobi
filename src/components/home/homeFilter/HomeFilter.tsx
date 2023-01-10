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
} from "react-native";
import styled from "styled-components/native";
import {
  BtnCTA,
  BtnText,
  Col,
  Container,
  HorizontalLine,
  HorizontalSpace,
  Row,
  TextMain,
  TextSub,
} from "~/styles/styledConsts";

import MenuFilterScreenStack from "~/navigators/home-filter-stack";

const BottomSheet = (props) => {
  const { modalVisible, setModalVisible, index } = props;
  const screenHeight = Dimensions.get("screen").height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          closeModal();
        } else {
          resetBottomSheet.start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (props.modalVisible) {
      resetBottomSheet.start();
    }
  }, [props.modalVisible]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setModalVisible(false);
    });
  };

  return (
    <>
      <Modal
        visible={modalVisible}
        animationType={"fade"}
        transparent
        statusBarTranslucent
      >
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.background} />
          </TouchableWithoutFeedback>

          <Animated.View
            style={{
              ...styles.bottomSheetContainer,
              transform: [{ translateY: translateY }],
            }}
            {...panResponders.panHandlers}
          >
            <MenuFilterScreenStack index={index} onPress={closeModal} />
          </Animated.View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  background: {
    flex: 1,
  },
  bottomSheetContainer: {
    height: 480,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  rootContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "white",
    marginRight: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

const FilterButton = (props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text>{props.list}</Text>
    </TouchableOpacity>
  );
};

const MenuFilterModal = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const pressButton = () => {
    setModalVisible(true);
  };
  return (
    <View style={styles.rootContainer}>
      <FilterButton
        list={props.children}
        onPress={pressButton}
        index={props.index}
      />
      <BottomSheet
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        index={props.index}
      />
    </View>
  );
};

export default MenuFilterModal;
