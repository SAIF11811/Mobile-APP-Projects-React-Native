import { StatusBar } from "react-native";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import AppNavigator from "./navigation/AppNavigator";
import { store } from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
      <Toast />
    </Provider>
  );
}
