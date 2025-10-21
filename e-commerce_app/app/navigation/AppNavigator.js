import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import CartScreen from "../screens/CartScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = ({ cartItems, removeItem }) => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: {
        backgroundColor: "#fff",
        borderTopWidth: 0,
        elevation: 5,
        height: 70,
      },
      tabBarActiveTintColor: "#007AFF",
      tabBarInactiveTintColor: "gray",
      tabBarIcon: ({ color, size }) => {
        let iconName;
        let iconSize = 28;

        switch (route.name) {
          case "Home":
            iconName = "home-outline";
            break;
          case "Categories":
            iconName = "grid-outline";
            break;
          case "Cart":
            iconName = "cart-outline";
            break;
          default:
            iconName = "ellipse";
        }
        return <Ionicons name={iconName} size={iconSize} color={color} />;
      },
      tabBarLabelStyle: {
        fontSize: 15,
        fontWeight: "bold",
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Categories" component={CategoriesScreen} />
    <Tab.Screen name="Cart">
      {(props) => (
        <CartScreen {...props} cartItems={cartItems} removeItem={removeItem} />
      )}
    </Tab.Screen>
  </Tab.Navigator>
);

export default function AppNavigator() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity) => {
    const item = { ...product, quantity };
    setCartItems((prev) => [...prev, item]);
  };

  const removeItem = (id) =>
    setCartItems((prev) => prev.filter((item) => item.id !== id));

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#007AFF" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen name="MainTabs" options={{ headerShown: false }}>
        {(props) => (
          <TabNavigator
            {...props}
            cartItems={cartItems}
            removeItem={removeItem}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="ProductDetails"
        options={{ title: "Product Details" }}
      >
        {(props) => <ProductDetailsScreen {...props} addToCart={addToCart} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
