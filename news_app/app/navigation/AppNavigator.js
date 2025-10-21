import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ArticleScreen from "../screens/ArticleScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: "News APP",
          headerTitleAlign: "center",
          headerTintColor: "white",
          sheetElevation: 30,
          statusBarHidden: true,
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 30,
          },
          headerStyle: {
            backgroundColor: "#3d3d3dff",
          },
        }}
      />
      <Stack.Screen
        name="Article"
        component={ArticleScreen}
        options={{
          headerTitle: "Article",
          headerTitleAlign: "center",
          headerTintColor: "white",
          sheetElevation: 30,
          statusBarHidden: true,
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 30,
          },
          headerStyle: {
            backgroundColor: "#3d3d3dff",
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
