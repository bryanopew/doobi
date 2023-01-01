import { View, Text, FlatList, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { getTestData } from "~/query/query";
import MenuSelect from "~/components/common/MenuSelect";
import {
  BtnCTA,
  BtnText,
  Col,
  Container,
  HorizontalLine,
  HorizontalSpace,
  Row,
  TextMain,
  TextSub,
} from "~/styles/styledConsts";
import MenuHeader from "~/components/common/MenuHeader";
import NutrientsProgress from "~/components/common/NutrientsProgress";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/stores/store";
import { IProduct } from "~/constants/constants";
import LikeFoodList from "~/components/likes/LikeFoodList";
import { setLikeFoods } from "~/stores/slices/likeSlice";
import colors from "~/styles/colors";

const MenuSelectContainer = styled.View`
  width: 100%;
  height: 48px;
  justify-content: center;
`;

const ListTitle = styled(TextMain)`
  font-size: 16px;
  font-weight: bold;
`;

const NoOfFoods = styled(TextSub)`
  font-size: 16px;
`;

const Likes = () => {
  // redux
  const { menuIndex } = useSelector((state: RootState) => state.cart);
  const { likeFoods } = useSelector((state: RootState) => state.like);
  const dispatch = useDispatch();
  // test data
  const [menuSelectOpen, setMenuSelectOpen] = useState(false);
  // console.log("likeFoods: ", likeFoods);

  // useEffect(() =>  {
  //   // 처음 렌더링 때 서버에서 likes 가져와서 useState로 관리
  //   // like 식품 삭제시에는 서버에서 delete + state에서 제거
  //   // 식품 상세페이지에서 찜 누르면 서버에 저장시켜서 like page 왔을 때 어차피 다시 렌더링
  //   // like page에서 상세페이지 갔다가 찜 누르고 뒤로가기 버튼으로 돌아온 경우는???????
  //   const getLikeData = async () => {
  //     const res = await getTestData();
  //     setLikeData(res);
  //   };
  //   getLikeData();
  // }, []);

  return (
    <Container>
      <MenuSelectContainer>
        <MenuHeader
          menuSelectOpen={menuSelectOpen}
          setMenuSelectOpen={setMenuSelectOpen}
        />
      </MenuSelectContainer>
      <NutrientsProgress menuIndex={menuIndex} />
      <Row style={{ marginTop: 32 }}>
        <ListTitle>찜한 상품</ListTitle>
        <NoOfFoods>{likeFoods?.length}</NoOfFoods>
      </Row>
      <HorizontalLine style={{ marginTop: 8 }} />
      {/* 여기 이상함 ㅠㅠ */}
      {/* <FlatList
        style={{ marginTop: 24 }}
        data={temp}
        renderItem={(item) => (
          <LikeFoodList item={item} menuIndex={menuIndex} />
        )}
        ItemSeparatorComponent={() => <HorizontalSpace height={16} />}
        keyExtractor={(item) => item.productNo}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      /> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <HorizontalSpace height={24} />
        {likeFoods.map((food, index) => {
          return (
            <Col key={index}>
              <LikeFoodList item={{ item: food }} menuIndex={menuIndex} />
              {likeFoods.length !== index && <HorizontalSpace height={16} />}
            </Col>
          );
        })}
      </ScrollView>
      <BtnCTA
        btnStyle="activated"
        onPress={async () => {
          const res = await getTestData();
          dispatch(setLikeFoods(res));
        }}
      >
        <BtnText>테스트 데이터</BtnText>
      </BtnCTA>
      {menuSelectOpen && <MenuSelect setOpen={setMenuSelectOpen} />}
    </Container>
  );
};

export default Likes;
