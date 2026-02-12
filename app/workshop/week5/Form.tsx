import { FormData } from "@/@types/FormData";
import { FormErrors } from "@/@types/FormError";
import CustomButton from "@/app/components/CustomButton";
import CustomInput from "@/app/components/CustomInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CheckBox from "./components/CheckBox";
import RadioGroup from "./components/RadioGroup";

const validateFullName = (value: string) => {
  if (!value.trim()) {
    return "กรุณากรอกชื่อ-นามสกุล";
  }

  if (value.trim().length < 3) {
    return "ชื่อ-นามสกุลต้องมีอย่างน้อย 3 ตัวอักษร";
  }

  return undefined;
};

const validateEmail = (value: string) => {
  if (!value.trim()) {
    return "กรุณากรอกอีเมล";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return "รูปแบบอีเมลไม่ถูกต้อง";
  }

  return undefined;
};

const validatePhone = (value: string) => {
  if (!value.trim()) {
    return "กรุณากรอกเบอร์โทรศัพท์";
  }

  const phoneRegex = /^\w{10}$/;
  if (!phoneRegex.test(value)) {
    return "เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก";
  }

  return undefined;
};

const validatePassword = (value: string) => {
  if (!value.trim()) {
    return "กรุณากรอกรหัสผ่าน";
  }

  if (value.length < 6) {
    return "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
  }

  return undefined;
};

const validateConfirmPassword = (value: string, password: string) => {
  if (!value.trim()) {
    return "กรุณากรอกยืนยันรหัสผ่าน";
  }

  if (value !== password) {
    return "รหัสผ่านไม่ตรงกัน";
  }

  return undefined;
};

const validateAddress = (value: string) => {
  if (value.trim().length < 10) {
    return "ต้องกรอกอย่างน้อย 10 ตัวอักษร";
  }

  return undefined;
};

const validateIsConsent = (isConsent: boolean) => {
  if (!isConsent) {
    return "ต้องยอมรับข้อตกลง";
  }

  return undefined;
};

const validateGender = (value: string) => {
  if (value === "") {
    return "ต้องเลือกเพศ";
  }

  return undefined;
};

const validateDateOfBirth = (value: Date) => {
  if (!value) {
    return "กรุณาเลือกวันเกิด";
  }

  const today = new Date();

  let age = today.getFullYear() - value.getFullYear();

  const monthDiff = today.getMonth() - value.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < value.getDate())) {
    age--;
  }

  if (age < 13) {
    return "ต้องมีอายุอย่างน้อย 13 ปี";
  }

  return undefined;
};

const validateFormField = <K extends keyof FormData>(
  fieldName: keyof FormData,
  value: FormData[K],
  password?: string,
): string | undefined => {
  if (fieldName === "fullName") {
    return validateFullName(value.toString());
  }

  if (fieldName === "email") {
    return validateEmail(value.toString());
  }

  if (fieldName === "phone") {
    return validatePhone(value.toString());
  }

  if (fieldName === "password") {
    return validatePassword(value.toString());
  }

  if (fieldName === "confirmPassword") {
    return validateConfirmPassword(value.toString(), password || "");
  }

  if (fieldName === "address") {
    return validateAddress(value.toString());
  }

  if (fieldName === "isConsent") {
    return validateIsConsent(value as boolean);
  }

  if (fieldName === "gender") {
    return validateGender(value.toString());
  }

  if (fieldName === "dateOfBirth") {
    return validateDateOfBirth(value as Date);
  }

  return undefined;
};

export default function Form() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    isConsent: false,
    gender: "",
    dateOfBirth: new Date(),
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const [touched, setTouched] = useState<{
    [K in keyof FormData]?: boolean;
  }>({});

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isOpenDateTimePicker, setIsOpenDateTimePicker] =
    useState<boolean>(false);

  const handleChange = <K extends keyof FormData>(
    name: keyof FormData,
    value: FormData[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      const errorMessage = validateFormField(name, value, formData.password);
      setErrors((prev) => ({
        ...prev,
        [name]: errorMessage,
      }));
    }
  };

  const handleBlur = (name: keyof FormData) => {
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const errorMessage = validateFormField(
      name,
      formData[name],
      formData.password,
    );
    setErrors((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));
  };

  const validateForm = (): boolean | undefined => {
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(formData) as (keyof FormData)[]).forEach((key) => {
      const errorMessage = validateFormField(
        key,
        formData[key],
        formData.password,
      );
      if (errorMessage) {
        isValid = false;
        newErrors[key] = errorMessage;
      }
    });

    setErrors(newErrors);

    const allTouched: { [key: string]: boolean } = {};
    (Object.keys(formData) as (keyof FormData)[]).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);
    return isValid;
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      address: "",
      isConsent: false,
      gender: "",
      dateOfBirth: new Date(),
    });
    setErrors({});
    setTouched({});
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();

    if (!validateForm()) {
      Alert.alert("ข้อมูลไม่ถูกต้อง", "กรุณาตรวจสอบข้อมูลและลองใหม่อีกครั้ง");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        "สำเร็จ!",
        `ลงทะเบียนสำเร็จ\n\nชื่อ ${formData.fullName}\nอีเมล ${formData.email}\nเบอร์ ${formData.phone}`,
        [
          {
            text: "ตรวจสอบ",
            onPress: () => console.log("Form Data: ", formData),
          },
          {
            text: "รีเซ็ตฟอร์ม",
            onPress: handleReset,
            style: "cancel",
          },
        ],
      );
    }, 2000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          className="flex-1 bg-gray-50"
          contentContainerClassName="pb-8"
          keyboardShouldPersistTaps="handled"
        >
          <View className="bg-blue-600 pt-16 pb-8 px-6">
            <Text className="text-white text-3xl font-bold">
              ลงทะเบียนสมาชิก
            </Text>
            <Text className="text-blue-100 text-base mt-2">
              กรุณากรอกข้อมูลให้ครบถ้วน
            </Text>
          </View>

          <View className="px-6 mt-6">
            <CustomInput
              label="ชื่อ-นามสกุล"
              placeholder="ระบุชื่อนามสกุล"
              value={formData.fullName}
              onChangeText={(value) => handleChange("fullName", value)}
              onBlur={() => handleBlur("fullName")}
              error={errors.fullName}
              touched={touched.fullName}
              autoCapitalize="words"
            />

            <CustomInput
              label="อีเมล"
              placeholder="example@email.com"
              value={formData.email}
              onChangeText={(value) => handleChange("email", value)}
              onBlur={() => handleBlur("email")}
              error={errors.email}
              touched={touched.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <CustomInput
              label="เบอร์โทรศัพท์"
              placeholder="0812345678"
              value={formData.phone}
              onChangeText={(value) => handleChange("phone", value)}
              onBlur={() => handleBlur("phone")}
              error={errors.phone}
              touched={touched.phone}
              keyboardType="phone-pad"
              maxLength={10}
            />

            <CustomInput
              label="รหัสผ่าน"
              placeholder="อย่างน้อย 6 ตัวอักษร"
              value={formData.password}
              onChangeText={(value) => handleChange("password", value)}
              onBlur={() => handleBlur("password")}
              error={errors.password}
              touched={touched.password}
              secureTextEntry
              autoCapitalize="none"
            />

            <CustomInput
              label="ยืนยันรหัสผ่าน"
              placeholder="ระบุรหัสผ่านอีกครั้ง"
              value={formData.confirmPassword}
              onChangeText={(value) => handleChange("confirmPassword", value)}
              onBlur={() => handleBlur("confirmPassword")}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
              secureTextEntry
              autoCapitalize="none"
            />

            <CustomInput
              label="ที่อยู่"
              value={formData.address}
              onChangeText={(value) => handleChange("address", value)}
              onBlur={() => handleBlur("address")}
              error={errors.address}
              touched={touched.address}
              maxLength={200}
              multiline={true}
              style={[{ minHeight: 100 }]}
              textAlignVertical="top"
              displayCharCount={true}
            />

            <CheckBox
              label="ยอมรับข้อตกลง"
              checked={formData.isConsent}
              error={errors.isConsent}
              touched={touched.address}
              onPress={() => handleChange("isConsent", !formData.isConsent)}
            />

            <RadioGroup
              label="เพศ"
              options={[
                { label: "ชาย", value: "ชาย" },
                { label: "หญิง", value: "หญิง" },
                { label: "ไม่ระบุ", value: "ไม่ระบุ" },
              ]}
              selectedValue={formData.gender}
              onSelect={(value) => handleChange("gender", value)}
              error={errors.gender}
              touched={touched.gender}
            />

            <CustomInput
              label="วัน/เดือน/ปี เกิด"
              value={formData.dateOfBirth.toLocaleDateString("en-GB")}
              onPress={() => setIsOpenDateTimePicker((prev) => !prev)}
              caretHidden={true}
              error={errors.dateOfBirth}
              touched={touched.dateOfBirth}
              autoCorrect={false}
            />

            {isOpenDateTimePicker && (
              <DateTimePicker
                value={formData.dateOfBirth}
                onChange={(_, date) => {
                  handleChange("dateOfBirth", date || new Date());
                  setIsOpenDateTimePicker(false);
                }}
              />
            )}

            <View className="mt-4 space-y-3">
              <CustomButton
                title="ลงทะเบียน"
                onPress={handleSubmit}
                variant="primary"
                loading={isLoading}
              />

              <CustomButton
                title="รีเซ็ตฟอร์ม"
                onPress={handleReset}
                variant="secondary"
                disabled={isLoading}
              />
            </View>

            <View className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <Text className="text-blue-800 font-semibold text-base mb-2">
                คำแนะนำ
              </Text>

              <Text className="text-blue-700 text-sm leading-relaxed">
                - กรอกข้อมูลให้ครบถ้วน{"\n"}- อีเมล ต้องเป็นรูปแบบที่ถูกต้อง
                {"\n"}- เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก{"\n"}- รหัสผ่าน
                ต้องมีอย่างน้อย 6 ตัวอักษร{"\n"}
              </Text>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
