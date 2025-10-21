import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

const COLORS = {
  primary: "#007AFF",
  background: "#F9FAFB",
  white: "#FFFFFF",
  text: "#1C1C1E",
  muted: "#8E8E93",
  border: "#E5E5EA",
};

const CartScreen = ({ cartItems, removeItem }) => {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert("Cart is empty", "Add items to your cart before checkout.");
      return;
    }

    const receipt = cartItems
      .map(
        (item) =>
          `${item.name} x${item.quantity || 1} = $${(
            item.price * (item.quantity || 1)
          ).toFixed(2)}`
      )
      .join("\n");

    const receiptMessage = `${receipt}\n\nTotal: $${total.toFixed(2)}`;

    Alert.alert("Receipt", receiptMessage, [{ text: "OK" }], {
      cancelable: true,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2038/2038854.png",
            }}
            style={styles.emptyImage}
          />
          <Text style={styles.emptyText}>Your cart is empty 🛍️</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.info}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.price}>
                    ${item.price.toFixed(2)} × {item.quantity || 1}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => removeItem(item.id)}>
                  <Text style={styles.remove}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyImage: { width: 160, height: 160, marginBottom: 15 },
  emptyText: { fontSize: 18, color: COLORS.muted },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 10,
  },
  image: { width: 70, height: 70, borderRadius: 10 },
  info: { flex: 1, marginLeft: 12 },
  name: { fontSize: 16, fontWeight: "600", color: COLORS.text },
  price: { color: COLORS.primary, marginTop: 4, fontSize: 15 },
  remove: { color: "red", fontWeight: "600" },
  totalContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    marginBottom: 15,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 5,
    elevation: 10,
  },
  totalText: { fontSize: 18, fontWeight: "700", marginBottom: 10 },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  checkoutText: { color: "#fff", fontSize: 17, fontWeight: "700" },
});

export default CartScreen;
