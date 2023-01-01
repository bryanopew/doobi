import {
  IUserInfo,
  IUserTarget,
  saveUserTarget,
} from "~/stores/slices/userInfoSlice";
import { AppDispatch } from "~/stores/store";
import { calculateCaloriesToNutr } from "./targetCalculation";

interface ISubmitParams {
  userInfo: IUserInfo;
  userTarget: IUserTarget;
  ratioType: string;
  caloriePerMeal: string;
  carbManual: string;
  proteinManual: string;
  fatManual: string;
  dispatch: AppDispatch;
}

const autoMethodSubmit = ({
  userInfo,
  userTarget,
  dispatch,
}: ISubmitParams) => {
  //  TBD | server request:
  //  API: put: /api/member/baseline/create-base-line
  //   {
  //     "companyCd": "string",
  //     "userId": "string",
  //     "calorie": "string",
  //     "carb": "string",
  //     "protein": "string",
  //     "fat": "string",
  //     "gender": "string",
  //     "age": "string",
  //     "height": "string",
  //     "weight": "string",
  //     "dietPurposeCd": "string",
  //     "weightTimeCd": "string",
  //     "aerobicTimeCd": "string"
  //   }
  console.log("autoMethodSubmit!");
};
const ratioMethodSubmit = ({
  userInfo,
  userTarget,
  ratioType,
  caloriePerMeal,
  dispatch,
}: ISubmitParams) => {
  //  TBD | server request:
  //  API: put: /api/member/baseline/create-base-line
  //   {
  //     "companyCd": "string",
  //     "userId": "string",
  //     "calorie": "string",
  //     "carb": "string",
  //     "protein": "string",
  //     "fat": "string",
  //     "gender": "string",
  //     "age": "string",
  //     "height": "string",
  //     "weight": "string",
  //     "dietPurposeCd": "string",
  //     "weightTimeCd": "string",
  //     "aerobicTimeCd": "string"
  //   }

  console.log("ratioMethodSubmit!");
  const { carb, protein, fat } = calculateCaloriesToNutr(
    ratioType,
    caloriePerMeal
  );
  dispatch(
    saveUserTarget({
      calorie: caloriePerMeal,
      carb,
      protein,
      fat,
    })
  );
};
const manualMethodSubmit = ({
  userInfo,
  userTarget,
  dispatch,
  carbManual,
  proteinManual,
  fatManual,
}: ISubmitParams) => {
  //  TBD | server request:
  //  API: put: /api/member/baseline/create-base-line
  //   {
  //     "companyCd": "string",
  //     "userId": "string",
  //     "calorie": "string",
  //     "carb": "string",
  //     "protein": "string",
  //     "fat": "string",
  //     "gender": "string",
  //     "age": "string",
  //     "height": "string",
  //     "weight": "string",
  //     "dietPurposeCd": "string",
  //     "weightTimeCd": "string",
  //     "aerobicTimeCd": "string"
  //   }
  console.log("manualMethodSubmit!");
  const calorieTarget =
    parseInt(carbManual) * 4 +
    parseInt(proteinManual) * 4 +
    parseInt(fatManual) * 9;

  dispatch(
    saveUserTarget({
      calorie: String(calorieTarget),
      carb: carbManual,
      protein: proteinManual,
      fat: fatManual,
    })
  );
};

interface ISubmitActions {
  [key: number]: Function;
}
export const submitActionsByMethod: ISubmitActions = {
  0: autoMethodSubmit, // 기존 store 값으로 server request
  1: ratioMethodSubmit, // 직접 입력한 target으로 server request + store 수정
  2: manualMethodSubmit, // 직접 입력한 target으로 server request + store 수정
};
