import React, { useState } from "react";
import { Text, ScrollView, StyleSheet, View } from "react-native";
import styled from "styled-components/native";
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
import colors from "~/styles/colors";

const HeaderText = styled(TextMain)`
  font-size: 18px;
  font-weight: bold;
`;
const ProductImage = styled.Image`
  width: 24px;
  height: 24px;
`;
const heads = ["총내용량", "250g", "호팔님의 1일 목표섭취량에 대한 비율"];
const bodyDatas = [
  ["칼로리", [["364kcal", "28%"]]],
  ["나트륨", [["", "472mg", "28%", ""]]],
  ["탄수화물", [["", "47g", "28%", ""]]],
  ["당류", [["", "2g", "28%", ""]]],
  ["단백질", [["", "15g", "28%", ""]]],
  ["지방", [["", "13g", "28%", ""]]],
];

const CustomTable = () => {
  return (
    <ScrollView style={styles.table}>
      <View style={[styles.row, styles.borderStyle]}>
        {heads.map((head, index) => (
          <View
            key={index}
            style={[styles.rowHeadItem, index < 3 && { flexGrow: 2 }]}
          >
            <Text style={[styles.rowHeadItemText]}>{head}</Text>
          </View>
        ))}
      </View>
      {bodyDatas.map(([storedName, values], index) => (
        <View key={index} style={[styles.row, styles.borderStyle]}>
          <View style={[styles.rowItem, { flexGrow: 1 }]}>
            <Text>{storedName}</Text>
          </View>
          <View style={{ flexGrow: 1 }}>
            {values.map((value, index2) => (
              <View key={index2} style={styles.row}>
                {value.map((text, index3) => {
                  if (index3 === 0 || index3 === value.length - 1) return null;

                  const style = [
                    styles.rowItem,
                    {
                      borderBottomColor: "grey",
                      borderBottomWidth: index2 === values.length - 1 ? 0 : 1,
                    },
                  ];

                  return index3 ? (
                    <View
                      style={[...style, index3 < 2 && { flexGrow: 1 }]}
                      key={index3}
                    >
                      <Text numberOfLines={1} style={styles.rowItemText}>
                        {text}
                      </Text>
                    </View>
                  ) : null;
                })}
              </View>
            ))}
          </View>
          <View style={[styles.rowItem]}></View>
        </View>
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowItem: {
    justifyContent: "center",
    width: 50,
    paddingHorizontal: 4,
    height: 32,
  },
  rowHeadItem: {
    justifyContent: "center",
    width: 50,
    paddingHorizontal: 4,
    height: 60,
  },
  borderStyle: {
    borderWidth: 1,
    borderColor: colors.inactivated,
  },
});
const NutrientPart = () => {
  return <CustomTable />;
};

export default NutrientPart;
