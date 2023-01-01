import { View, Text } from "react-native";
import React, { useEffect, useRef } from "react";
import styled from "styled-components/native";
import { useSelector } from "react-redux";
import { RootState } from "~/stores/store";
import { Controller } from "react-hook-form";
import {
  ErrorBox,
  ErrorText,
  InputHeaderText,
  UserInfoTextInput,
} from "~/styles/styledConsts";
import { IDropdownField, validationRules } from "~/constants/constants";
import { calculateManualCalorie } from "~/util/targetCalculation";
import colors from "~/styles/colors";

const ContentsContainer = styled.View``;

const InputHeader = styled(InputHeaderText)`
  margin-top: 24px;
`;
const Input = styled(UserInfoTextInput)``;

const SummaryContainer = styled.View`
  margin-top: 12px;
  border-width: 1px;
  border-color: ${colors.main};
  border-radius: 5px;
  padding: 16px;
`;

const NutrientSummaryText = styled.Text`
  font-size: 12px;
  color: ${colors.textMain};
`;
interface IManual {
  carbManual: string;
  proteinManual: string;
  fatManual: string;
  setValue: any;
  control: any;
  handleSubmit: any;
  errors: any;
  scrollRef?: any;
}
const Manual = ({
  carbManual,
  proteinManual,
  fatManual,
  setValue,
  control,
  handleSubmit,
  errors,
  scrollRef,
}: IManual) => {
  // redux
  const { userInfo, userTarget } = useSelector(
    (state: RootState) => state.userInfo
  );

  const carbRecommended = userTarget.carb;
  const proteinRecommended = userTarget.protein;
  const fatRecommended = userTarget.fat;

  // ref
  const manualRefs = useRef([]);

  // 자동으로 계산된 전체 칼로리 및 각 영양성분 칼로리 비율 구하기
  const { totalCalorie, carbRatio, proteinRatio, fatRatio } =
    calculateManualCalorie(carbManual, proteinManual, fatManual);

  // react-hook-form
  const renderCarbInput = (
    { field: { onChange, value } }: IDropdownField,
    carbRecommended: string,
    manualRefs?: React.MutableRefObject<any[]>
  ) => {
    return (
      <>
        <InputHeader isActivated={value ? true : false}>
          한 끼 탄수화물 (g)
        </InputHeader>
        <Input
          placeholder={`한 끼 탄수화물 입력 (추천: ${carbRecommended})`}
          onFocus={() => scrollRef?.current.scrollTo({ y: 40, animated: true })}
          value={value}
          onChangeText={onChange}
          isActivated={value ? true : false}
          keyboardType="numeric"
          maxLength={3}
          ref={(el) => {
            manualRefs ? (manualRefs.current[0] = el) : null;
          }}
          onSubmitEditing={() => {
            manualRefs?.current[1].focus();
          }}
        />
      </>
    );
  };
  const renderProteinInput = (
    { field: { onChange, value } }: IDropdownField,
    proteinRecommended: string,
    manualRefs?: React.MutableRefObject<any[]>
  ) => {
    return (
      <>
        <InputHeader isActivated={value ? true : false}>
          한 끼 단백질 (g)
        </InputHeader>
        <Input
          placeholder={`한 끼 단백질 입력 (추천: ${proteinRecommended})`}
          onFocus={() => scrollRef?.current.scrollTo({ y: 40, animated: true })}
          value={value}
          onChangeText={onChange}
          isActivated={value ? true : false}
          keyboardType="numeric"
          maxLength={3}
          ref={(el) => {
            manualRefs ? (manualRefs.current[1] = el) : null;
          }}
          onSubmitEditing={() => {
            manualRefs?.current[2].focus();
          }}
        />
      </>
    );
  };
  const renderFatInput = (
    { field: { onChange, value } }: IDropdownField,
    fatRecommended: string,
    manualRefs?: React.MutableRefObject<any[]>
  ) => {
    return (
      <>
        <InputHeader isActivated={value ? true : false}>
          한 끼 지방 (g)
        </InputHeader>
        <Input
          placeholder={`한 끼 지방 입력 (추천: ${fatRecommended})`}
          onFocus={() => scrollRef?.current.scrollTo({ y: 40, animated: true })}
          value={value}
          onChangeText={onChange}
          isActivated={value ? true : false}
          keyboardType="numeric"
          maxLength={3}
          ref={(el) => {
            manualRefs ? (manualRefs.current[2] = el) : null;
          }}
        />
      </>
    );
  };

  useEffect(() => {
    handleSubmit(() => console.log("submit!"))();
  }, []);

  return (
    <ContentsContainer>
      <Controller
        control={control}
        rules={validationRules.carbManual}
        render={(field) => renderCarbInput(field, carbRecommended, manualRefs)}
        name="carbManual"
      />
      {errors.carbManual && (
        <ErrorBox>
          <ErrorText>{errors.carbManual.message}</ErrorText>
        </ErrorBox>
      )}

      <Controller
        control={control}
        rules={validationRules.proteinManual}
        render={(field) =>
          renderProteinInput(field, proteinRecommended, manualRefs)
        }
        name="proteinManual"
      />
      {errors.proteinManual && (
        <ErrorBox>
          <ErrorText>{errors.proteinManual.message}</ErrorText>
        </ErrorBox>
      )}

      <Controller
        control={control}
        rules={validationRules.fatManual}
        render={(field) => renderFatInput(field, fatRecommended, manualRefs)}
        name="fatManual"
      />
      {errors.fatManual && (
        <ErrorBox>
          <ErrorText>{errors.fatManual.message}</ErrorText>
        </ErrorBox>
      )}
      <SummaryContainer>
        <NutrientSummaryText>
          칼로리: {totalCalorie || "   "}kcal ( {carbRatio || "  "} :{" "}
          {proteinRatio || "  "} : {fatRatio || "  "} )
        </NutrientSummaryText>
      </SummaryContainer>
    </ContentsContainer>
  );
};

export default Manual;
