import { Text, TextInput, TextInputProps, View } from "react-native";

export interface CustomInputProps extends TextInputProps {
  label: string;
  error?: string;
  touched?: boolean;
  className?: string;
  displayCharCount?: boolean;
}

export default function CustomInput({
  label,
  error,
  touched,
  displayCharCount,
  ...props
}: Readonly<CustomInputProps>) {
  const hasError = touched && error;
  return (
    <View className="w-full mb-4">
      <Text className="text-gray-700 font-semibold mb-2">{label}</Text>
      <TextInput
        className={`w-full px-4 py-3 rounded-lg border-2
          ${hasError ? "border-red-500" : "border-gray-300"}
          ${props.editable === false ? "bg-gray-100" : "bg-white"}
          text-base text-gray-800
          `}
        placeholderTextColor={"#9CA3AF"}
        {...props}
      ></TextInput>

      <View className="flex flex-row justify-between items-center">
        {/* Error Message */}
        {hasError && <Text className="text-red-500 text-sm">{error}</Text>}
        {displayCharCount && (
          <Text className="self-end">{props.value?.length}/200</Text>
        )}
      </View>
    </View>
  );
}
