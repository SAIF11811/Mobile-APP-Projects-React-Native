import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="black" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#5b5b5bff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loading;
