import { View, Text, Button } from "react-native";
import CustomButton from "./CustomButton";


export interface ItemCardProps {
  id: string;
  productName: string;
  price: number;
  pcs: number;
  btnSize: "small" | "medium" | "large";
  btnColor: "primary" | "secondary" | "danger";
}

export default function ItemCard(props: Readonly<ItemCardProps>) {
  return (
    <View className="item-card">
      <Text className="text-4xl font-bold leading-normal">ชื่อสินค้า: {props.productName}</Text>
      <Text className="text-base">ราคา: {props.price}</Text>
      <Text className="text-base">จำนวน: {props.pcs}</Text>
      <CustomButton btnSize={props.btnSize} btnColor={props.btnColor}>
        <Text className="text-white">ซื้อสินค้า</Text>
      </CustomButton>
    </View>
  );
}
