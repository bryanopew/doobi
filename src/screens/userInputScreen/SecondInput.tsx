import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import {
  aerobicTrainingCategrory,
  NavigationProps,
  validationRules,
  weightTrainingCategrory,
} from "~/constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/stores/store";
import styled from "styled-components/native";
import {
  BtnBottomCTA,
  BtnText,
  Container,
  ErrorBox,
  ErrorText,
  InputHeaderText,
  TextMain,
  UserInfoTextInput,
} from "~/styles/styledConsts";
import { Controller, useForm, useWatch } from "react-hook-form";
import Dropdown from "~/components/userInput/Dropdown";
import {
  IUserInfo,
  saveUserInfo,
  saveUserTarget,
  userInfoState,
} from "~/stores/slices/userInfoSlice";
import { calculateNutrTarget } from "~/util/targetCalculation";

interface IFormData {
  bmrKnown: string;
  weightTimeCd: string;
  aerobicTimeCd: string;
}

interface IFormField {
  field: {
    onChange: () => void;
    onBlur: () => void;
    value: string;
  };
}

const Title = styled(TextMain)`
  font-size: 24px;
  font-weight: bold;
`;

const InputHeader = styled(InputHeaderText)`
  margin-top: 24px;
`;
const Input = styled(UserInfoTextInput)``;

const renderBmrKnownInput = (
  { field: { onChange, value } }: IFormField,
  handleSubmit: Function,
  userInfo1Refs?: React.MutableRefObject<any[]>
) => {
  // const onSubmit = (data) => console.log("dddd", data);
  return (
    <>
      <InputHeader isActivated={value ? true : false}>
        기초대사량(kcal)
      </InputHeader>
      <Input
        placeholder="기초대사량을 알고있다면 적어주세요 (kcal)"
        value={value}
        onChangeText={onChange}
        isActivated={value ? true : false}
        keyboardType="numeric"
        maxLength={4}
      />
    </>
  );
};

const onHandlePress = (
  dispatch: Function,
  navigate: Function,
  userInfo: IUserInfo,
  bmrKnownValue: string,
  weightTimeCdValue: string,
  aerobicTimeCdValue: string
) => {
  // 기초대사량 직접 입력된 경우는 입력된 bmr로
  const bmrMod = bmrKnownValue ? bmrKnownValue : userInfo.bmr;
  const nutrTarget = calculateNutrTarget(
    userInfo.weight,
    weightTimeCdValue,
    aerobicTimeCdValue,
    userInfo.dietPurposecd,
    bmrMod
  );
  dispatch(
    saveUserInfo({
      bmr: bmrMod,
      weightTimeCd: weightTimeCdValue,
      aerobicTimeCd: aerobicTimeCdValue,
    })
  );
  dispatch(
    saveUserTarget({
      tmr: nutrTarget.tmr,
      calorie: nutrTarget.calorie,
      carb: nutrTarget.carb,
      protein: nutrTarget.protein,
      fat: nutrTarget.fat,
    })
  );

  navigate("InputNav", { screen: "ThirdInput", params: "" });
};

const SecondInput = ({ navigation: { navigate }, route }: NavigationProps) => {
  const { userInfo } = useSelector((state: RootState) => state.userInfo);
  console.log("userInfo2: userInfo:", userInfo);
  // redux
  const dispatch = useDispatch();

  // react-hook-form
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<IFormData>({
    // 나중에 사용자 정보 있으면 초기값으로 넣어줘야함.
    defaultValues: {
      bmrKnown: "",
      weightTimeCd: weightTrainingCategrory[0].value,
      aerobicTimeCd: aerobicTrainingCategrory[0].value,
    },
  });
  const bmrKnownValue = useWatch({ control, name: "bmrKnown" });
  const weightTimeCdValue = useWatch({ control, name: "weightTimeCd" });
  const aerobicTimeCdValue = useWatch({ control, name: "aerobicTimeCd" });
  useEffect(() => {
    handleSubmit(() => console.log("submit!"))();
  }, []);
  return (
    <Container>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        <Title>{"선택정보를\n입력해주세요"}</Title>
        <Controller
          control={control}
          rules={validationRules.bmrKnown}
          render={(field) => renderBmrKnownInput(field, handleSubmit)}
          name="bmrKnown"
        />
        {errors.bmrKnown && (
          <ErrorBox>
            <ErrorText>{errors.bmrKnown.message}</ErrorText>
          </ErrorBox>
        )}
        <Dropdown
          placeholder="웨이트 운동시간"
          items={weightTrainingCategrory}
          value={weightTimeCdValue}
          setValue={setValue}
          reactHookFormName="weightTimeCd"
        />
        <Dropdown
          placeholder="유산소 운동시간"
          items={aerobicTrainingCategrory}
          value={aerobicTimeCdValue}
          setValue={setValue}
          reactHookFormName="aerobicTimeCd"
        />
      </ScrollView>
      <BtnBottomCTA
        btnStyle={
          Object.keys(errors).length === 0 ? "activated" : "inactivated"
        }
        disabled={Object.keys(errors).length === 0 ? false : true}
        onPress={() =>
          onHandlePress(
            dispatch,
            navigate,
            userInfo,
            bmrKnownValue,
            weightTimeCdValue,
            aerobicTimeCdValue
          )
        }
      >
        <BtnText>다음</BtnText>
      </BtnBottomCTA>
    </Container>
  );
};

export default SecondInput;
