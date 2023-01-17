import { View, Text, ScrollView, Modal, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import {
  IFormField,
  NavigationProps,
  SCREENHEIGHT,
  SCREENWIDTH,
  validationRules,
} from "~/constants/constants";
import {
  AlertContentContainer,
  BtnCTA,
  BtnText,
  Container,
  HorizontalSpace,
  InputHeaderText,
  Row,
  TextMain,
  TextSub,
  UserInfoTextInput,
} from "~/styles/styledConsts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/stores/store";
import { Controller, useForm, useWatch } from "react-hook-form";
import Postcode from "@actbase/react-daum-postcode";
import colors from "~/styles/colors";
import {
  addAddress,
  deleteAddress,
  setSelectedAddressId,
  updateAddress,
} from "~/stores/slices/orderSlice";
import DAlert from "~/components/common/DAlert";

const PostalCode = styled(TextSub)`
  font-size: 16px;
`;

const AddressDeleteBtn = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
`;

const AddressDeleteIcon = styled.Image`
  width: 24px;
  height: 24px;
`;

const AddressBase = styled(TextMain)`
  font-size: 20px;
  margin-top: 16px;
`;

const InputHeader = styled(InputHeaderText)`
  margin-top: 24px;
`;
const Input = styled(UserInfoTextInput)``;

const AddressEditBtn = styled(BtnCTA)`
  height: 48px;
`;
const AddressConfirmBtn = styled(BtnCTA)`
  margin-top: 8px;
  margin-bottom: 8px;
`;
const ModalBackGround = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #000000a6;
`;

const AlertText = styled(TextMain)`
  font-size: 16px;
  align-self: center;
`;

const renderDeleteAlertContent = () => (
  <AlertContentContainer>
    <AlertText>해당 배송지를</AlertText>
    <AlertText>삭제하시겠어요?</AlertText>
  </AlertContentContainer>
);

const AddressEdit = ({
  navigation: { navigate, setOptions },
  route,
}: NavigationProps) => {
  const currentAddressId =
    route.params?.currentAddressId ?? route.params?.currentAddressId;
  const isCreate = currentAddressId === undefined ? true : false;

  // redux
  const dispatch = useDispatch();
  const {
    orderInfo: { address },
  } = useSelector((state: RootState) => state.order);

  const [showDetails, setShowDetails] = useState(!isCreate);
  const [postModalVisible, setPostModalVisible] = useState(false);
  const [addressDeleteAlertShow, setAddressDeleteAlertShow] = useState(false);
  const [postalCode, setPostalCode] = useState("");
  const [addressBase, setAddressBase] = useState("");

  // react-hook-form
  const {
    control,
    handleSubmit,
    setValue: setAddressDetailValue,
    formState: { errors, isValid },
  } = useForm<{ addressDetail: string }>({
    defaultValues: {
      addressDetail: isCreate ? "" : address[currentAddressId]?.detail,
    },
  });
  const addressDetailValue = useWatch({ control, name: "addressDetail" });
  const renderDetailInput = ({ field: { onChange, value } }: IFormField) => {
    return (
      <>
        <InputHeader isActivated={value ? true : false}>상세주소</InputHeader>
        <Input
          placeholder={`상세주소`}
          value={value}
          onChangeText={onChange}
          isActivated={value ? true : false}
          keyboardType="default"
        />
      </>
    );
  };

  useEffect(() => {
    setShowDetails(!isCreate);
    setOptions({
      headerTitle: isCreate ? "배송지 추가" : "배송지 변경",
    });
    setPostalCode(isCreate ? "" : address[currentAddressId]?.postalCode);
    setAddressBase(isCreate ? "" : address[currentAddressId]?.base);
    setAddressDetailValue(
      "addressDetail",
      isCreate ? "" : address[currentAddressId]?.detail
    );
  }, [currentAddressId, isCreate]);

  console.log(`AddressEdit: currentAddressId`, currentAddressId);
  console.log(`AddressEdit: isCreate`, isCreate);

  return (
    <Container>
      <ScrollView>
        {showDetails && (
          <>
            <Row style={{ marginTop: 24, justifyContent: "space-between" }}>
              <PostalCode>우편번호: {postalCode}</PostalCode>
              <AddressDeleteBtn
                onPress={() => {
                  setAddressDeleteAlertShow(true);
                }}
              >
                <AddressDeleteIcon
                  source={require(`~/assets/icons/24_icon=close.png`)}
                />
              </AddressDeleteBtn>
            </Row>
            <AddressBase>{addressBase}</AddressBase>
            <HorizontalSpace height={8} />
            <Controller
              control={control}
              rules={validationRules.addressDetail}
              render={(field) => renderDetailInput(field)}
              name="addressDetail"
            />
          </>
        )}
      </ScrollView>

      <AddressEditBtn
        btnStyle="border"
        onPress={() => {
          setPostModalVisible(true);
        }}
      >
        <BtnText style={{ color: colors.textSub, fontSize: 16 }}>
          {showDetails ? `주소 전체변경` : `주소 추가`}
        </BtnText>
      </AddressEditBtn>
      <AddressConfirmBtn
        btnStyle="activated"
        onPress={() => {
          console.log("onPress", isCreate);
          if (isCreate) {
            console.log("isCreate!");
            if (postalCode && addressBase && addressDetailValue) {
              dispatch(
                addAddress({
                  postalCode: postalCode,
                  base: addressBase,
                  detail: addressDetailValue,
                })
              );
              console.log("onPress: address.length: ", address.length);
              dispatch(setSelectedAddressId(address.length));
              navigate("Order");
            } else {
              Alert.alert("정보를 모두 입력해주세요");
            }
          } else {
            console.log("update!");
            dispatch(
              updateAddress({
                address: {
                  postalCode: postalCode,
                  base: addressBase,
                  detail: addressDetailValue,
                },
                currentAddressId,
              })
            );
            navigate("Order");
          }
        }}
      >
        <BtnText>확인</BtnText>
      </AddressConfirmBtn>
      <Modal
        animationType="slide"
        transparent={true}
        visible={postModalVisible}
        onRequestClose={() => {
          setPostModalVisible(!postModalVisible);
        }}
      >
        <ModalBackGround>
          <Postcode
            style={{ width: SCREENWIDTH - 32, height: SCREENHEIGHT / 2 }}
            jsOptions={{ animation: true, hideMapBtn: false }}
            onSelected={(data) => {
              setAddressBase(data.roadAddress);
              setPostalCode(String(data.zonecode));
              setShowDetails(true);
              setPostModalVisible(false);
            }}
            onError={() => console.log("오류")}
          />
        </ModalBackGround>
      </Modal>
      <DAlert
        alertShow={addressDeleteAlertShow}
        onCancel={() => {
          setAddressDeleteAlertShow(false);
        }}
        onConfirm={() => {
          dispatch(deleteAddress(currentAddressId));
          dispatch(
            setSelectedAddressId(
              currentAddressId === 0 ? 0 : currentAddressId - 1
            )
          );
          navigate("Order");
        }}
        renderContent={renderDeleteAlertContent}
        confirmLabel={"삭제"}
      />
    </Container>
  );
};

export default AddressEdit;
