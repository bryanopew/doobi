import AsyncStorage from "@react-native-async-storage/async-storage";
import { KakaoOAuthToken, login } from "@react-native-seoul/kakao-login";
import axios from "axios";
import { PRODUCT_LIST, GET_TOKEN, GET_AUTH, RE_ISSUE_TOKEN } from "./urls";

// doobi server------------------ //
// 카카오 토큰으로 DoobiToken 발급
export const getDoobiToken = async (kakaoAccessToken: string | null) => {
  try {
    console.log("getDoobiToken!");
    const result = await axios.get(`${GET_TOKEN}/${kakaoAccessToken}`);
    console.log(result.status);
    return result?.status === 200 ? result.data : undefined;
  } catch (e) {
    console.log("getDoobiToken: ", e);
  }
};

// asyncStorage ------------------------ //
export const storeToken = async (
  accessToken: string,
  refreshToken?: string
) => {
  await AsyncStorage.setItem("ACCESS_TOKEN", accessToken);
  refreshToken && (await AsyncStorage.setItem("REFRESH_TOKEN", refreshToken));
};

const getStoredToken = async () => {
  const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
  const refreshToken = await AsyncStorage.getItem("REFRESH_TOKEN");
  return {
    accessToken,
    refreshToken,
  };
};

/** 토큰 만료되었으면 재발급받거나 or 카카오로그인 후
 * 유효한 토큰을 발급받아 다시 저장 후 성공/실패 반환
 * @return  토큰 재발급 성공 / 실패
 */
export const validateToken = async () => {
  let isValid = false;
  try {
    try {
      const { accessToken, refreshToken } = await getStoredToken();
      try {
        // 인증여부 조회
        const auth = await axios.get(`${GET_AUTH}`, {
          headers: {
            authentication: `Bearer ${accessToken}`,
          },
        });
        console.log("auth res: ", auth.data);
        isValid = true;
      } catch (e) {
        console.log(e, "accessToken 만료");
        // 토큰 재발급
        const reIssue = await axios.get(`${RE_ISSUE_TOKEN}`, {
          headers: {
            authentication: `Bearer ${refreshToken}`,
          },
        });
        await storeToken(reIssue.data.accessToken, reIssue.data.refreshToken);
        console.log("reIssue res: ", reIssue.data);
        isValid = true;
      }
    } catch (e) {
      console.log(e, "refresh만료");
      // 카카오로그인
      const kakaoToken: KakaoOAuthToken = await login();
      const { accessToken, refreshToken } = await getDoobiToken(
        kakaoToken.accessToken
      );
      if (accessToken && refreshToken) {
        await storeToken(accessToken, refreshToken);
      }
      isValid = true;
    }
  } catch (e) {
    console.log(e, "kakao token 발급 오류");
  }
  return isValid;
};

export const getTestData = async () => {
  const isTokenValid = await validateToken();
  console.log("getTestData: isTokenValid: ", isTokenValid);

  if (isTokenValid) {
    const { accessToken, refreshToken } = await getStoredToken();
    const res = await axios.get(
      `${PRODUCT_LIST}?searchText=도시락&categoryCd=&sort`,
      {
        headers: {
          authentication: `Bearer ${accessToken}`,
        },
      }
    );
    return res.data.slice(0, 3);
  }
};
