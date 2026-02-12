import { Pressable, Text, View } from "react-native";

type CheckBoxProps = {
  label: string;
  checked: boolean;
  onPress: () => void;
  error?: string;
  touched?: boolean;
};

export default function CheckBox({
  label,
  checked,
  onPress,
  error,
  touched,
}: Readonly<CheckBoxProps>) {
  const hasError = touched && error;

  return (
    <View className="flex">
      <Pressable onPress={onPress} className="flex-row items-center gap-2">
        <View
          className={`w-5 h-5 rounded border-2 items-center justify-center
            ${checked ? "bg-blue-600 border-blue-600" : "border-gray-400"}
            ${hasError ? "border-red-500" : ""}
          `}
        >
          {checked && <Text className="text-white text-xs">✓</Text>}
        </View>

        <Text className="text-base">{label}</Text>
      </Pressable>

      {hasError && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
}
