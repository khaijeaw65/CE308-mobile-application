import { View, Text } from "react-native";
import ItemCard, { ItemCardProps } from "./components/ItemCard";
import CustomInput from "./components/CustomInput";
import { useState } from "react";
import CustomButton from "./components/CustomButton";

export default function Index() {
  const items: ItemCardProps[] = [
    {
      id: "1",
      productName: "Banana",
      price: 2000,
      pcs: 10,
      btnSize: "small",
      btnColor: "primary",
    },
    {
      id: "2",
      productName: "Mango",
      price: 2000,
      pcs: 10,
      btnSize: "medium",
      btnColor: "secondary",
    },
    {
      id: "3",
      productName: "Apple",
      price: 2000,
      pcs: 10,
      btnSize: "large",
      btnColor: "danger",
    },
  ];

  const [form, setForm] = useState({
    productName: "",
    price: "",
    pcs: "",
  });

  return (
    <View className="gap-3 p-3">
      <Text className="text-2xl font-bold">กรอกข้อมูลสินค้า</Text>
      <CustomInput label="ชื่อสินค้า" placeholder="กรอกชื่อสินค้า" value={form.productName} onChange={(text) => setForm({...form, productName: text})} />
      <CustomInput label="ราคา" placeholder="กรอกราคา" value={form.price} onChange={(text) => setForm({...form, price: text})} />
      <CustomInput label="จำนวน" placeholder="กรอกจำนวน" value={form.pcs} onChange={(text) => setForm({...form, pcs: text})} />
      <CustomButton btnSize="medium" btnColor="primary">
        <Text className="text-white">ยืนยัน</Text>
      </CustomButton>
    </View>
  );
}
