import React from "react";
import { IUserInfo } from "~/stores/slices/userInfoSlice";
import { calculateBMR, calculateNutrTarget } from "./targetCalculation";

export const changeNutrByWeight = (
  userInfo: IUserInfo,
  weightValue: string
) => {
  const bmr = calculateBMR(
    userInfo.gender,
    userInfo.age,
    userInfo.height,
    weightValue
  );
  const res = calculateNutrTarget(
    weightValue,
    userInfo.weightTimeCd,
    userInfo.aerobicTimeCd,
    userInfo.dietPurposecd,
    bmr
  );
  return res;
};
