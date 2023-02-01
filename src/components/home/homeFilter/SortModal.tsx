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
import { Col, Row, TextMain, TextSub, Container } from "~/styles/styledConsts";
import colors from "~/styles/colors";

const SortIconImage = styled.Image`
width:24px
height:24px
`;
const CategoryListContainer = styled.View`
  flex-direction: column;
  align-items: center;
  border-top-width: 0.5px;
  border-color: ${colors.inactivated};
  padding: 10px;
`;

const CategoryListText = styled.Text`
  font-size: 16px;
  color: ${colors.textMain};
`;

const FilterButtonContainer = styled.View`
  flex-direction: row;
`;

const StyledButton = styled.TouchableOpacity`
align-items: center;
flex: 1;
height: 50px
padding: 15px;
border-width: 1px;
border-radius: 4px;
margin: 5px;
margin-top: 20px;
border-color: ${colors.inactivated};
`;
const ButtonText = styled.Text`
  color: ${colors.textSub};
  font-size: 16px;
`;
const CategoryListButton = styled.TouchableOpacity`
  margin-top: 10px;
`;
const CategoryFilter = ({ navigation }): JSX.Element => {
  const [click, setClick] = useState();
  const category = [
    { id: 1, text: "가격" },
    { id: 2, text: "가칼비" },
    { id: 3, text: "가단비" },
  ];

  return (
    <Container>
      <ScrollView>
        {category.map((i, index) => (
          <CategoryListButton key={i.id}>
            <CategoryListContainer
              style={[index === 0 && { borderTopWidth: 0 }]}
            >
              <Row style={{ marginTop: 8 }}>
                <CategoryListText>{i.text}</CategoryListText>
                <SortIconImage source={require("~/assets/icons/24_sort.png")} />
              </Row>
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
    </Container>
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
    <TouchableOpacity onPress={list.onPress}>
      <Row>
        <Text>정렬</Text>
        <SortIconImage source={require(`~/assets/icons/24_sort.png`)} />
      </Row>
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
