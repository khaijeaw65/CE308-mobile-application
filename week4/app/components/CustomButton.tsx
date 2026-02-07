import { TouchableOpacity, View } from "react-native";

export interface CustomButtonProps {
  btnSize: "small" | "medium" | "large";
  btnColor: "primary" | "secondary" | "danger";
}

export default function CustomButton({
  btnSize,
  btnColor,
  children,
}: Readonly<React.PropsWithChildren<CustomButtonProps>>) {
  const sizeClasses = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  const colorClasses = {
    primary: "bg-blue-500 hover:bg-blue-700",
    secondary: "bg-gray-500 hover:bg-gray-700",
    danger: "bg-red-500 hover:bg-red-700",
  };

  return (
    <TouchableOpacity
      className={`${colorClasses[btnColor]} ${sizeClasses[btnSize]} self-start rounded-lg`}
    >
      <View>{children}</View>
    </TouchableOpacity>
  );
}
