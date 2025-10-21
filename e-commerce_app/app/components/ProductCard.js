import React from "react";
import { Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const ProductCard = ({ product, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    margin: 8,
    flex: 1,
    alignItems: "center",
    elevation: 20,
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 8,
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 8,
  },
  price: {
    fontSize: 14,
    color: "#007AFF",
    marginTop: 4,
  },
});

export default ProductCard;
