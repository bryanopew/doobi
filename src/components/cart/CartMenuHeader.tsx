import { View, Text } from "react-native";
import React, { SetStateAction } from "react";
import styled from "styled-components/native";
import { TextMain } from "~/styles/styledConsts";
import { useSelector } from "react-redux";
import { RootState } from "~/stores/store";
import { SCREENWIDTH } from "~/constants/constants";

const Header = styled.TouchableOpacity`
  flex-direction: row;
`;

const HeaderText = styled(TextMain)`
  font-size: 18px;
  font-weight: bold;
  left: 137px;
  margin-top: 16px;
`;

const Arrow = styled.Image`
  width: 24px;
  height: 24px;
  left: 137px;
  margin-top: 16px;
`;
interface IMenuHeader {
  menuSelectOpen: boolean;
  setMenuSelectOpen: React.Dispatch<SetStateAction<boolean>>;
}
const CartMenuHeader = ({ menuSelectOpen, setMenuSelectOpen }: IMenuHeader) => {
  const { menuIndex } = useSelector((state: RootState) => state.cart);
  return (
    <Header onPress={() => setMenuSelectOpen((v) => !v)}>
      <HeaderText>{`식단${menuIndex + 1}`}</HeaderText>
      {menuSelectOpen ? (
        <Arrow source={require(`~/assets/icons/24_dropdown_up.png`)} />
      ) : (
        <Arrow source={require(`~/assets/icons/24_dropdown_down.png`)} />
      )}
    </Header>
  );
};

export default CartMenuHeader;
