import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

export interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant: "primary" | "secondary" | "danger";
  disabled?: boolean;
  loading?: boolean;
}

export default function CustomButton({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
}: Readonly<React.PropsWithChildren<CustomButtonProps>>) {
  const variantClasses = {
    primary: "bg-blue-600 active:bg-blue-700",
    secondary: "bg-gray-600 hover:bg-gray-700",
    danger: "bg-red-600 hover:bg-red-700",
  };

  const defaultColor =
    variantClasses[variant] || "bg-blue-600 hover:bg-blue-700";

  return (
    <TouchableOpacity
      className={`w-full px-6 py-4 rounded-lg
        ${defaultColor}
        flex-row justify-center items-center
        `}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className="text-white font-bold text-lg">{title}</Text>
      )}
    </TouchableOpacity>
  );
}
