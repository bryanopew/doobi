import { View, Text, FlatList, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { NavigationProps, SCREENWIDTH } from "~/constants/constants";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "~/stores/store";
import colors from "~/styles/colors";
import NutrTarget from "~/components/common/NutrientTarget";
import {
  HorizontalLine,
  TextMain,
  TextSub,
  VerticalLine,
  VerticalSpace,
} from "~/styles/styledConsts";
import DAlert from "~/components/common/DAlert";
import DBottomSheet from "~/components/common/DBottomSheet";
import {
  Asset,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";
import axios from "axios";
import { useChangeHeaderRight, useChangeHeaderTitle } from "~/util/customHooks";

const Container = styled.View`
  flex: 1;
  background-color: ${colors.white};
`;

const Card = styled.View`
  margin-top: 16px;
  padding: 0px 16px 16px 16px;
`;

const ListTitle = styled(TextMain)`
  font-size: 16px;
  margin-top: 16px;
`;

const TargetNutrContainer = styled.View`
  width: 100%;
  margin-top: 16px;
`;

const WeightBox = styled.View`
  margin-top: 16px;
  width: 210px;
  border-left-width: 1px;
  border-right-width: 1px;
  border-color: ${colors.inactivated};
  align-items: center;
  align-self: center;
`;

const WeightDate = styled(TextSub)`
  font-size: 12px;
`;
const WeightBold = styled(TextMain)`
  font-size: 20px;
  font-weight: bold;
`;
const Weight = styled(TextMain)`
  font-size: 20px;
`;

const HistoryImageRow = styled.View`
  flex-direction: row;
  margin-top: 16px;
  height: 192px;
`;

const ImageBox = styled.TouchableOpacity`
  width: 192px;
  height: 192px;
  border-radius: 10px;
`;

const HistoryImage = styled.Image`
  flex: 1;
  border-radius: 10px;
  background-color: ${colors.highlight};
`;

const ImageDeleteBtn = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 8px;
  right: 8px;
`;
const DeleteImage = styled.Image`
  width: 24px;
  height: 24px;
`;

const ImageAddBtn = styled.TouchableOpacity`
  width: ${({ isFirst }: { isFirst?: boolean }) =>
    isFirst ? `192px` : `96px`};
  height: 192px;
  margin-left: 8px;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${colors.inactivated};
  justify-content: center;
  align-items: center;
`;

const AddImage = styled.Image`
  width: 24px;
  height: 24px;
`;

const DeleteAlertContainer = styled.View`
  padding: 28px 16px 28px 16px;
  justify-content: center;
  align-items: center;
`;

const AlertText = styled.Text`
  font-size: 16px;
`;

const AddAlertContainer = styled.View`
  margin-top: 16px;
`;

const AddOptionBtn = styled.TouchableOpacity`
  width: 100%;
  height: 58px;
  align-items: center;
  justify-content: center;
`;

const AddOptionBtnText = styled(TextMain)`
  font-size: 16px;
  font-weight: 600;
`;

const HistoryDetail = ({
  navigation,
  route: {
    params: { date },
  },
}: NavigationProps) => {
  const [historyDeleteAlertShow, setHistoryDeleteAlertShow] = useState(false);
  const [imageAddAlertShow, setImageAddAlertShow] = useState(false);
  const [imagePicked, setImagePicked] = useState<Array<Asset>>([]);
  useChangeHeaderTitle(date);
  useChangeHeaderRight("삭제", setHistoryDeleteAlertShow);
  // redux
  const { userTarget } = useSelector((state: RootState) => state.userInfo);

  type INutrTargetData = Array<{
    nutrient: string;
    value: string;
    color: string;
  }>;
  const nutrTargetData: INutrTargetData = [
    {
      nutrient: "칼로리",
      value: userTarget.calorie,
      color: colors.main,
    },
    {
      nutrient: "탄수화물",
      value: userTarget.carb,
      color: colors.blue,
    },
    {
      nutrient: "단백질",
      value: userTarget.protein,
      color: colors.green,
    },
    {
      nutrient: "지방",
      value: userTarget.fat,
      color: colors.orange,
    },
  ];

  const renderHistory = (item: Asset) => (
    <ImageBox
      onPress={() => {
        console.log("imageSource");
      }}
    >
      <HistoryImage source={{ uri: item.uri }} />
      <ImageDeleteBtn
        onPress={() => {
          console.log("delete!");
        }}
      >
        <DeleteImage source={require(`~/assets/icons/24_icon=close.png`)} />
      </ImageDeleteBtn>
    </ImageBox>
  );

  const onDeleteAlertConfirm = () => {
    console.log("기록삭제");
    // TBD | 기록삭제 로직
    navigation.navigate("HistoryNav", { screen: "History" });
  };

  const renderDeleteAlertContent = () => (
    <DeleteAlertContainer>
      <AlertText>기록을</AlertText>
      <AlertText>삭제하시겠어요?</AlertText>
    </DeleteAlertContainer>
  );

  const uploadData = async (fileName: string, uri: string) => {
    let formData = new FormData();
    const photo = {
      uri: uri,
      type: "multipart/form-data",
      name: fileName,
    };
    formData.append("image", photo);
    console.log("uploadData: formData: ", formData);
    // TBD | axios request 추가하기
    //   axios.post('serverUrl',formData,{
    //     headers: {'content-type': 'multipart/form-data'}
    // })
  };

  // imagePicker actions (react-native-image-picker)
  const pickImage = async (method: "camera" | "library") => {
    if (imagePicked.length >= 3) {
      Alert.alert("사진은 3개 까지만 업로드가 가능해요");
      return;
    }

    const result: ImagePickerResponse =
      method === "camera"
        ? await launchCamera({ mediaType: "photo" })
        : await launchImageLibrary({ mediaType: "photo" });

    if (!result.assets || result.assets.length === 0) return;
    // TBD | 지금은 state에 저장하는데 나중에 서버에 저장해야함!
    setImagePicked((v) => [...v, result.assets[0]]); // 아 이거 어떻게 없애는거야?
    await uploadData(result.assets[0].fileName, result?.assets[0].uri);
    setImageAddAlertShow(false);
  };

  const renderAddAlertContent = () => (
    <AddAlertContainer>
      <AddOptionBtn onPress={() => pickImage("camera")}>
        <AddOptionBtnText>카메라</AddOptionBtnText>
        <HorizontalLine style={{ position: "absolute", bottom: 4 }} />
      </AddOptionBtn>
      <AddOptionBtn onPress={() => pickImage("library")}>
        <AddOptionBtnText>갤러리</AddOptionBtnText>
        <HorizontalLine style={{ position: "absolute", bottom: 4 }} />
      </AddOptionBtn>
    </AddAlertContainer>
  );
  console.log("HistoryDetail: imagePicked: ", imagePicked);
  return (
    <Container>
      <Card>
        <ListTitle>목표 영양섭취량</ListTitle>
        <TargetNutrContainer>
          <FlatList
            data={nutrTargetData}
            keyExtractor={(item) => item.nutrient}
            renderItem={({ item }) => (
              <NutrTarget
                nutrient={item.nutrient}
                value={item.value}
                color={item.color}
              />
            )}
            horizontal={true}
            ItemSeparatorComponent={() => <VerticalLine />}
          />
        </TargetNutrContainer>
      </Card>
      <Card>
        <ListTitle>몸무게</ListTitle>
        <WeightBox>
          <WeightDate>{date}</WeightDate>
          <WeightBold>
            97<Weight>kg</Weight>
          </WeightBold>
        </WeightBox>
      </Card>
      <Card>
        <ListTitle>사진기록</ListTitle>
        <HistoryImageRow>
          {imagePicked.length === 0 || (
            <FlatList
              horizontal={true}
              data={imagePicked}
              renderItem={({ item }) => renderHistory(item)}
              keyExtractor={(item, index) => String(index)}
              ItemSeparatorComponent={() => <VerticalSpace width={20} />}
              showsHorizontalScrollIndicator={false}
            />
          )}

          <ImageAddBtn
            isFirst={imagePicked.length === 0}
            onPress={() => {
              setImageAddAlertShow(true);
            }}
          >
            <AddImage source={require(`~/assets/icons/24_autoMenu.png`)} />
          </ImageAddBtn>
        </HistoryImageRow>
      </Card>
      <DAlert
        alertShow={historyDeleteAlertShow}
        onCancel={() => setHistoryDeleteAlertShow(false)}
        onConfirm={onDeleteAlertConfirm}
        renderContent={renderDeleteAlertContent}
        confirmLabel="삭제"
      />
      <DBottomSheet
        alertShow={imageAddAlertShow}
        setAlertShow={setImageAddAlertShow}
        onCancel={() => {
          setImageAddAlertShow(false);
        }}
        renderContent={renderAddAlertContent}
      />
    </Container>
  );
};

export default HistoryDetail;
