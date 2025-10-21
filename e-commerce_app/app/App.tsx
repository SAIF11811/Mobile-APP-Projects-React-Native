import React from "react";
import AppNavigator from "./navigation/AppNavigator";
import Toast, { BaseToast, ToastProps } from "react-native-toast-message";

const toastConfig = {
  success: (props: ToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "#00c72bff",
        borderLeftWidth: 15,
        height: 80,
        borderRadius: 15,
        padding: 15,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 20, fontWeight: "bold", color: "#007AFF" }}
      text2Style={{ fontSize: 16, fontWeight: "500", color: "#111" }}
    />
  ),
};

export default function App() {
  return (
    <>
      <AppNavigator />
      <Toast config={toastConfig} />
    </>
  );
}
