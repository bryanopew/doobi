import { View, Text, FlatList, Alert } from "react-native";
import React, { useState } from "react";
import styled from "styled-components/native";
import DropDownPicker from "react-native-dropdown-picker";
import colors from "~/styles/colors";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/stores/store";
import {
  addMenuToCart,
  deleteMenu,
  setMenuIndex,
} from "~/stores/slices/cartSlice";
import { Col, HorizontalLine, TextMain } from "~/styles/styledConsts";
import { IProduct } from "~/constants/constants";
import DAlert from "./DAlert";
const Container = styled.View`
  padding: 0px 16px 24px 16px;
`;

const DeleteText = styled(TextMain)`
  font-size: 16px;
`;
const SelectContainer = styled.View`
  position: absolute;
  top: 48px;
  left: 16px;
  width: 144px;
  background-color: ${colors.white};
  border-radius: 3px;
  border-width: 1px;
  border-color: ${colors.inactivated};
`;
const Menu = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  height: 48px;
  align-items: center;
  justify-content: center;
`;
const MenuText = styled.Text`
  font-size: 16px;
  color: ${({ isActivated }: { isActivated?: boolean }) =>
    isActivated ? colors.main : colors.textMain};
`;

const DeleteBtn = styled.TouchableOpacity`
  position: absolute;
  right: 8px;
  width: 24px;
  height: 24px;
`;

const DeleteImg = styled.Image`
  width: 24px;
  height: 24px;
`;

const menuToDropdownValues = (cart: Array<Array<IProduct>>) => {
  const dropdownCategory = cart.map((v, index) => {
    return { label: `끼니 ${index + 1}`, index: index };
  });
  return dropdownCategory;
};

interface IMenuSelect {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const MenuSelect = ({ setOpen }: IMenuSelect) => {
  // redux
  const { menuIndex, cart } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const [alertShow, setAlertShow] = useState(false);

  const dropdownCategory = menuToDropdownValues(cart);
  const deleteAlertContent = (props) => {
    return (
      <Container>
        <Col style={{ marginTop: 24, marginLeft: 24 }}>
          <DeleteText>끼니 {props + 1}를 삭제하시겠어요?</DeleteText>
        </Col>
      </Container>
    );
  };
  const ShowAlert = (props) => {
    const { index } = props.pick;
    return (
      <DAlert
        alertShow={alertShow}
        renderContent={() => deleteAlertContent(index)}
        onConfirm={() => (
          dispatch(setMenuIndex(index - 1)),
          dispatch(deleteMenu(index)),
          setAlertShow(false)
        )}
        onCancel={() => setAlertShow(false)}
      />
    );
  };
  return (
    <SelectContainer>
      <FlatList
        data={dropdownCategory}
        renderItem={({ item }) => (
          <Menu
            onPress={() => {
              dispatch(setMenuIndex(item.index));
              setOpen(false);
            }}
          >
            <MenuText isActivated={item.index === menuIndex}>
              {item.label}
            </MenuText>
            {item.index == 0 || (
              <>
                <DeleteBtn
                  onPress={() => {
                    setAlertShow(true);
                  }}
                >
                  <DeleteImg
                    source={require(`~/assets/icons/24_icon=close.png`)}
                  />
                  <ShowAlert pick={item} />
                </DeleteBtn>
              </>
            )}
          </Menu>
        )}
        keyExtractor={(item) => item.label}
        ItemSeparatorComponent={() => <HorizontalLine />}
      />
      <HorizontalLine />
      <Menu
        onPress={() => {
          if (cart[menuIndex].length === 0) {
            Alert.alert("현재 끼니에 식품을 추가하고 이용해보세요");
            return;
          }
          if (cart.length > 2) {
            Alert.alert("끼니는 3개까지만 추가 가능합니다");
            return;
          }
          dispatch(addMenuToCart());
        }}
      >
        <MenuText>끼니 추가하기</MenuText>
      </Menu>
    </SelectContainer>
  );
};

export default MenuSelect;
