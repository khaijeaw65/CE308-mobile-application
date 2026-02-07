import { TextInput, View, Text } from "react-native";

export interface CustomInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
}

export default function CustomInput(props: Readonly<CustomInputProps>) {
  return (
    <View>
      <Text className="text-lg mb-1">{props.label}</Text>
      <TextInput
        className="border border-black rounded-lg h-11 px-3"
        value={props.value}
        placeholder={props.placeholder}
        onChangeText={props.onChange}
      ></TextInput>
    </View>
  );
}
