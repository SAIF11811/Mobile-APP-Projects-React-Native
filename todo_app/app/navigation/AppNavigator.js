import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import ArchivedTasksScreen from "../screens/ArchivedTasksScreen";
import CreateTaskScreen from "../screens/CreateTaskScreen";
import DoneTasksScreen from "../screens/DoneTasksScreen";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        let activeColor, icon;

        if (route.name === "Create") {
          activeColor = "#007AFF";
          icon = "create-outline";
        } else if (route.name === "Done") {
          activeColor = "#12c502ff";
          icon = "checkmark-done-outline";
        } else if (route.name === "Archive") {
          activeColor = "#FF9500";
          icon = "archive-outline";
        }

        return {
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: "bold",
            marginBottom: 4,
          },
          tabBarStyle: {
            height: 70,
            paddingBottom: 8,
            paddingTop: 6,
          },
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={icon}
              size={30}
              color={focused ? activeColor : "#999"}
            />
          ),
          tabBarActiveTintColor: activeColor,
          tabBarInactiveTintColor: "#999",
        };
      }}
    >
      <Tab.Screen name="Create" component={CreateTaskScreen} />
      <Tab.Screen name="Done" component={DoneTasksScreen} />
      <Tab.Screen name="Archive" component={ArchivedTasksScreen} />
    </Tab.Navigator>
  );
}
