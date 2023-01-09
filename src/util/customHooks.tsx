import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import styled from "styled-components/native";
import { TextMain } from "~/styles/styledConsts";

const DeleteBtn = styled.TouchableOpacity`
  width: 36px;
  height: 36px;
  justify-content: center;
  align-items: center;
`;
const DeleteBtnText = styled(TextMain)`
  font-size: 12px;
`;

export const useChangeHeaderTitle = (title: string) => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerTitle: title });
  }, []);
};

export const useChangeHeaderRight = (
  btnText: string,
  setAlertShow: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <DeleteBtn
          onPress={() => {
            setAlertShow(true);
          }}
        >
          <DeleteBtnText>{btnText}</DeleteBtnText>
        </DeleteBtn>
      ),
    });
  }, []);
};
