import { Pressable, Text, View } from "react-native";

type Option = {
  label: string;
  value: string;
};

type RadioGroupProps = {
  label?: string;
  options: Option[];
  selectedValue: string;
  onSelect: (value: string) => void;
  error?: string;
  touched?: boolean;
};

export default function RadioGroup({
  label,
  options,
  selectedValue,
  onSelect,
  error,
  touched,
}: Readonly<RadioGroupProps>) {
  const hasError = touched && !!error;

  return (
    <View className="mb-4">
      {label && <Text className="text-base font-medium mb-2">{label}</Text>}

      {options.map((option) => {
        const isSelected = selectedValue === option.value;

        return (
          <Pressable
            key={option.value}
            onPress={() => onSelect(option.value)}
            className="flex-row items-center mb-2"
          >
            {/* Outer Circle */}
            <View
              className={`w-5 h-5 rounded-full border-2 items-center justify-center mr-2
                ${isSelected ? "border-blue-600" : "border-gray-400"}
                ${hasError ? "border-red-500" : ""}
              `}
            >
              {/* Inner Dot */}
              {isSelected && (
                <View className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              )}
            </View>

            <Text className="text-base">{option.label}</Text>
          </Pressable>
        );
      })}

      {hasError && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
}
