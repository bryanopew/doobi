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
  Image,
} from "react-native";
import styled from "styled-components/native";

const FilterHeaderContainer = styled.View`
  flex-direction: row;
`;
const FilterHeaderText = styled.Text`
  font-weight: bold;
  font-size: 17px;
  margin-right: 20px;
  margin-left: 5px;
  margin-top: 20px;
  margin-bottom: 15px;
`;

const CategoryListContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
  margin-bottom: 12px;
  border-top-width: 0.5px;
  border-color: grey;
`;

const CategoryListText = styled.Text`
  margin-top: 12px;
  font-size: 15px;
  font-weight: bold;
`;

const FilterButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const RowContainer = styled.View`
  flex-direction: row;
`;

// const ButtonContainer = styled.View`
//   flex: 1;
//   border: 0.5px grey;
//   border-radius: 10px;
//   align-items: center;
//   margin: 10px;
// `;
const StyledButton = styled.TouchableOpacity`
  align-items: center;
  flex: 1;
  padding: 15px;
  background-color: white;
  border-width: 1px;
  border-radius: 5px;
  margin: 10px;
  margin-top: 20px;
  border-color: #8f8f8f;
`;
const ButtonText = styled.Text`
  font-weight: bold;
  color: #8f8f8f;
`;
const CategoryListButton = styled.TouchableOpacity``;
const CategoryFilter = ({ navigation }): JSX.Element => {
  const [click, setClick] = useState();
  const category = [
    { id: 1, text: "가격" },
    { id: 2, text: "가칼비" },
    { id: 3, text: "가단비" },
  ];

  return (
    <ScrollView style={styles.wrapper}>
      {category.map((i, index) => (
        <CategoryListButton key={i.id}>
          <CategoryListContainer style={[index === 0 && { borderTopWidth: 0 }]}>
            <RowContainer>
              <CategoryListText>{i.text}</CategoryListText>
              <Image
                style={{
                  transform: [{ scale: 0.55 }],
                }}
                source={require("~/assets/icons/24_sort.png")}
              />
            </RowContainer>
          </CategoryListContainer>
        </CategoryListButton>
      ))}
      <FilterButtonContainer>
        <StyledButton>
          <ButtonText>초기화</ButtonText>
        </StyledButton>
        <StyledButton>
          <ButtonText>확인</ButtonText>
        </StyledButton>
      </FilterButtonContainer>
    </ScrollView>
  );
};

const BottomSheet = (props) => {
  const { modalVisible, setModalVisible } = props;
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
            <CategoryFilter />
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
    height: 300,
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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

const SortButton = (list, pressButton) => {
  // console.log(list);
  return (
    <TouchableOpacity style={styles.button} onPress={list.onPress}>
      <Text>정렬</Text>
    </TouchableOpacity>
  );
};

const SortModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const pressButton = () => {
    setModalVisible(true);
  };
  return (
    <View style={styles.rootContainer}>
      <SortButton onPress={pressButton} />
      <BottomSheet
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

export default SortModal;
