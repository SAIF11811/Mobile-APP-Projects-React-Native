import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

const COLORS = {
  primary: "#007AFF",
  background: "#F9FAFB",
  text: "#1C1C1E",
  lightGray: "#E5E5EA",
  white: "#FFFFFF",
};

const CategoriesScreen = ({ navigation }) => {
  const products = useSelector((state) => state.products.list);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Shopping</Text>

      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === item && styles.selectedButton,
            ]}
            onPress={() => setSelectedCategory(item)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === item && styles.selectedText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 10 }}
      />

      <FlatList
        data={filteredProducts}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() =>
              navigation.navigate("ProductDetails", { product: item })
            }
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "white",
    backgroundColor: COLORS.primary,
    marginBottom: 10,
    padding: 20,
    borderEndEndRadius: 20,
    borderEndStartRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  categoryButton: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    margin: 10,
    height: 45,
    alignSelf: "flex-start",
  },
  selectedButton: {
    backgroundColor: COLORS.primary,
  },
  categoryText: { fontSize: 18, fontWeight: "600", color: COLORS.text },
  selectedText: { color: COLORS.white },
});

export default CategoriesScreen;
