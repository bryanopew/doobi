import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import styled from "styled-components/native";
import colors from "~/styles/colors";
import { NavigationProps, SCREENWIDTH } from "~/constants/constants";
import { useForm, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/stores/store";
import DAlert from "~/components/common/DAlert";
import WeightChangeAlert from "~/components/myPage/WeightChangeAlert";
import { calculateBMR, calculateNutrTarget } from "~/util/targetCalculation";
import { updateUserInfo } from "~/stores/slices/userInfoSlice";
import { changeNutrByWeight } from "~/util/alertActions";
import { BtnBottomCTA, BtnText } from "~/styles/styledConsts";
import { getUserBaseLine } from "~/query/query";

const Container = styled.View`
  flex: 1;
  background-color: ${colors.white};
`;

const HistoryBox = styled.TouchableOpacity`
  width: ${SCREENWIDTH / 3}px;
  height: ${SCREENWIDTH / 3}px;
  border-width: 1px;
  border-color: ${colors.inActivated};
`;
const HistoryImage = styled.Image`
  flex: 1;
  background-color: ${colors.backgroundLight};
`;

const History = ({ navigation: { navigate } }: NavigationProps) => {
  const { userInfo } = useSelector((state: RootState) => state.userInfo);
  const [alertShow, setAlertShow] = useState(false);
  const dispatch = useDispatch();

  // react-hook-form
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<{ weight: string }>({
    defaultValues: {
      weight: userInfo.weight,
    },
  });
  const [autoCalculate, setAutoCalculate] = useState(false);
  const weightValue = useWatch({ control, name: "weight" });
  const testArr = [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
  ];

  const renderAlertContent = () => {
    return (
      <WeightChangeAlert
        type="weight"
        control={control}
        handleSubmit={handleSubmit}
        errors={errors}
        autoCalculate={autoCalculate}
        setAutoCalculate={setAutoCalculate}
      />
    );
  };

  const onAlertConfirm = () => {
    const res = changeNutrByWeight(userInfo, weightValue);
    if (autoCalculate) {
      // TBD | store, 서버에 weight, 바뀐 target정보 Put
      dispatch(updateUserInfo(res));
    } else if (!autoCalculate) {
      // TBD | store, 서버에 weight, tmr정보만 Put
      dispatch(updateUserInfo({ tmr: res.tmr, weight: weightValue }));
    }
    getUserBaseLine();
    setAlertShow(false);
    navigate("HistoryNav", {
      screen: "HistoryDetail",
      params: { date: "2022.07.11" },
    });
  };

  return (
    <Container>
      <FlatList
        data={testArr}
        renderItem={({ item }) => (
          <HistoryBox
            onPress={() => {
              console.log("해당 기록으로 이동");
            }}
          >
            <HistoryImage />
          </HistoryBox>
        )}
        horizontal={false}
        numColumns={3}
      />
      <BtnBottomCTA
        btnStyle="activated"
        width={SCREENWIDTH - 32}
        onPress={() => setAlertShow(true)}
      >
        <BtnText>기록추가</BtnText>
      </BtnBottomCTA>

      <DAlert
        alertShow={alertShow}
        onCancel={() => setAlertShow(false)}
        onConfirm={onAlertConfirm}
        renderContent={renderAlertContent}
        confirmLabel="기록추가"
      />
    </Container>
  );
};

export default History;
