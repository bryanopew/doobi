import { Dimensions, Platform } from "react-native";

// RN constants
export const { width, height } = Dimensions.get("screen");
export const SCREENWIDTH = Math.min(width, height);
export const SCREENHEIGHT = Math.max(width, height);

export const IS_ANDROID = Platform.OS === "android";
export const IS_IOS = Platform.OS === "ios";

// Doobi server category etc.
export const DIET_PURPOSE_CD = {
  1: "SP002001",
  2: "SP002002",
  3: "SP002003",
  4: "SP002004",
  5: "SP002005",
};
export const purposeCategory = [
  { label: "다이어트(한 달 1~2kg감량)", value: "SP002001" },
  { label: "다이어트(한 달 3~4kg감량)", value: "SP002002" },
  { label: "체중유지", value: "SP002003" },
  { label: "체중증가(한 달 1~2kg증량) ", value: "SP002004" },
  { label: "체중증가(한 달 3~4kg증량)", value: "SP002005" },
];
export const weightTrainingCategrory = [
  { label: "하루 30분 이하", value: "SP003001" },
  { label: "하루 30분~1시간 이하", value: "SP003002" },
  { label: "하루 1시간~1시간30분이하", value: "SP003003" },
  { label: "하루 1시간30분~2시간 이하", value: "SP003004" },
  { label: "하루 2시간 이상", value: "SP003005" },
];
export const aerobicTrainingCategrory = [
  { label: "하루 30분 이하", value: "SP004001" },
  { label: "하루 30분~1시간 이하", value: "SP004002" },
  { label: "하루 1시간~1시간30분이하", value: "SP004003" },
  { label: "하루 1시간30분~2시간 이하", value: "SP004004" },
  { label: "하루 2시간 이상", value: "SP004005" },
];
export const nutrRatioCategory = [
  { label: "55 : 20 : 25(보건복지부 추천)", value: "SP005001" },
  { label: "20 : 20: 60(저탄고지 식단)", value: "SP005002" },
  { label: "40 : 40 : 20(벌크업용)", value: "SP005003" },
];
// consts for screens
export const myPageBtns = [
  { title: "몸무게 변경", btnId: "ChangeWeight" },
  { title: "내 기록", btnId: "History" },
  { title: "찜한 식품", btnId: "Likes" },
  { title: "주문내역", btnId: "Orders" },
];

interface ITimeToMinutes {
  [key: string]: number;
}
export const timeCdToMinutes: ITimeToMinutes = {
  SP003001: 0,
  SP003002: 30,
  SP003003: 60,
  SP003004: 90,
  SP003005: 120,
  SP004001: 0,
  SP004002: 30,
  SP004003: 60,
  SP004004: 90,
  SP004005: 120,
};
interface IPurposeToCalorie {
  [key: string]: {
    targetText: string;
    additionalCalorieText: string;
    additionalCalorie: string;
  };
}
export const purposeCdToValue: IPurposeToCalorie = {
  SP002001: {
    targetText: "한 달 1~2kg 감량",
    additionalCalorieText: "-500kcal",
    additionalCalorie: "-500",
  },
  SP002002: {
    targetText: "한 달 3~4kg 감량",
    additionalCalorieText: "-700kcal",
    additionalCalorie: "-700",
  },
  SP002003: {
    targetText: "유지",
    additionalCalorieText: "0kcal",
    additionalCalorie: "0",
  },
  SP002004: {
    targetText: "한 달 1~2kg 증량",
    additionalCalorieText: "500kcal",
    additionalCalorie: "500",
  },
  SP002005: {
    targetText: "한 달 3~4kg 증량",
    additionalCalorieText: "700kcal",
    additionalCalorie: "700",
  },
};

interface IRatioCdValue {
  [key: string]: {
    carbRatio: string;
    proteinRatio: string;
    fatRatio: string;
  };
}
export const ratioCdToValue: IRatioCdValue = {
  SP005001: {
    carbRatio: "0.55",
    proteinRatio: "0.2",
    fatRatio: "0.25",
  },
  SP005002: {
    carbRatio: "0.2",
    proteinRatio: "0.2",
    fatRatio: "0.6",
  },
  SP005003: {
    carbRatio: "0.4",
    proteinRatio: "0.4",
    fatRatio: "0.2",
  },
};

// validationRules
interface IValidationRules {
  [key: string]: {
    [key: string]: any;
  };
}
export const validationRules: IValidationRules = {
  age: {
    required: "필수 정보입니다",
    maxLength: 3,
    validate: {
      range: (v: string) =>
        (parseInt(v) >= 10 && parseInt(v) <= 100) ||
        "10~100세 안으로 입력해주세요",
    },
  },
  height: {
    required: "필수 정보입니다",
    maxLength: 3,
    validate: {
      range: (v: string) =>
        (parseFloat(v) >= 120 && parseFloat(v) <= 230) ||
        "정확한 신장을 입력해주세요",
    },
  },
  weight: {
    required: "필수 정보입니다",
    maxLength: 3,
    validate: {
      range: (v: string) =>
        (parseInt(v) >= 30 && parseInt(v) <= 130) ||
        "정확한 몸무게를 입력해주세요",
    },
  },
  bmrKnown: {
    maxlength: 4,
    validate: {
      range: (v: string) =>
        (parseFloat(v) >= 500 && parseFloat(v) <= 3000) ||
        v === "" ||
        "정확한 기초대사량을 입력해주세요",
    },
  },
  calorie: {
    maxlength: 4,
    validate: {
      range: (v: string) =>
        (parseFloat(v) >= 300 && parseFloat(v) <= 1500) ||
        "300~1500 kcal 사이로 입력해주세요",
    },
  },
  // TBD | carbManual -> carb로 고쳐서 mypage에서 validationRulesByNutr 단계 없애기
  carb: {
    maxlength: 4,
    validate: {
      range: (v: string) =>
        !v
          ? `모든 영양성분을 입력해주세요`
          : (parseFloat(v) >= 10 && parseFloat(v) <= 375) ||
            `한 끼에 ${v}g은 안돼요 ㅠㅠ`,
    },
  },
  protein: {
    maxlength: 4,
    validate: {
      range: (v: string) =>
        !v
          ? `모든 영양성분을 입력해주세요`
          : (parseFloat(v) >= 10 && parseFloat(v) <= 375) ||
            `한 끼에 ${v}g은 안돼요 ㅠㅠ`,
    },
  },
  fat: {
    maxlength: 4,
    validate: {
      range: (v: string) =>
        !v
          ? `모든 영양성분을 입력해주세요`
          : (parseFloat(v) >= 5 && parseFloat(v) <= 100) ||
            `한 끼에 ${v}g은 안돼요 ㅠㅠ`,
    },
  },
};

// type
// TBD | react navigation ts 적용 아직 모름
export interface NavigationProps {
  navigation: {
    navigate: Function;
  };
  route?: any;
}

export interface IFormField {
  field: {
    onChange: () => void;
    onBlur: () => void;
    value: string;
  };
}

export interface IProduct {
  // productNo: string;
  // platformNm: string;
  // itemReportNo: string;
  // categoryNm: string;
  // subCategoryNm: string;
  // productNm: string;
  // calorie: string;
  // sodium: string;
  // carb: string;
  // sugar: string;
  // fiber: string;
  // protein: string;
  // fat: string;
  // cholesterol: string;
  // transFat: string;
  // saturatedFat: string;
  // price: string;
  // minQty: string;
  // shippingPrice: string;
  // freeShippingPrice: string;
  // freeShippingYn: string;
  // mainAttUrl: string;
  // subAttUrl: string;
  [key: string]: string;
}
