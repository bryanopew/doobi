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
  IProduct,
} from "~/stores/slices/cartSlice";
import { Col, HorizontalLine, TextMain } from "~/styles/styledConsts";

const SelectContainer = styled.View`
  position: absolute;
  top: 48px;
  left: 16px;
  width: 144px;
  background-color: ${colors.white};
  border-radius: 3px;
  border-width: 1px;
  border-color: ${colors.inActivated};
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
    return { label: `식단 ${index + 1}`, index: index };
  });
  return dropdownCategory;
};

interface IMenuSelect {
  menuIndex: number;
  setMenuIndex: React.Dispatch<React.SetStateAction<number>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const MenuSelect = ({
  menuIndex,
  setMenuIndex,
  open,
  setOpen,
}: IMenuSelect) => {
  // redux
  const { cart } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const dropdownCategory = menuToDropdownValues(cart);
  return (
    <SelectContainer>
      <FlatList
        data={dropdownCategory}
        renderItem={({ item }) => (
          <Menu
            onPress={() => {
              setMenuIndex(item.index);
              setOpen(false);
            }}
          >
            <MenuText isActivated={item.index === menuIndex}>
              {item.label}
            </MenuText>
            {item.index == 0 || (
              <DeleteBtn
                onPress={() => {
                  setMenuIndex(item.index - 1);
                  dispatch(deleteMenu(item.index));
                }}
              >
                <DeleteImg
                  source={require(`~/assets/icons/24_icon=close.png`)}
                />
              </DeleteBtn>
            )}
          </Menu>
        )}
        keyExtractor={(item) => item.label}
        ItemSeparatorComponent={() => <HorizontalLine />}
      />
      <HorizontalLine />
      <Menu
        onPress={() => {
          if (cart.length > 2) {
            Alert.alert("식단은 3개까지만 추가 가능합니다");
            return;
          }
          dispatch(addMenuToCart());
        }}
      >
        <MenuText>식단 추가하기</MenuText>
      </Menu>
    </SelectContainer>
  );
};

export default MenuSelect;