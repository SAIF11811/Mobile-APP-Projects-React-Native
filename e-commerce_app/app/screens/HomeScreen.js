import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const COLORS = {
  primary: "#007AFF",
  background: "#F9FAFB",
  text: "#1C1C1E",
  muted: "#8E8E93",
  accent: "#FF9500",
};

const offers = [
  {
    id: "1",
    title: "Big Sale",
    description: "Up to 50% off on selected items",
    image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg",
  },
  {
    id: "2",
    title: "New Arrivals",
    description: "Check out the latest products",
    image: "https://images.pexels.com/photos/2783873/pexels-photo-2783873.jpeg",
  },
  {
    id: "3",
    title: "Clearance Sale",
    description: "Everything must go!",
    image: "https://images.pexels.com/photos/4032364/pexels-photo-4032364.jpeg",
  },
  {
    id: "4",
    title: "Seasonal Discounts",
    description: "Special offers for the season",
    image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
  },
  {
    id: "5",
    title: "Flash Deals",
    description: "Limited time offers, act fast!",
    image:
      "https://images.pexels.com/photos/16213982/pexels-photo-16213982.jpeg",
  },
];

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const waveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim, {
          toValue: -1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [waveAnim]);

  const rotate = waveAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: ["-20deg", "20deg"],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View style={styles.welcomeContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.welcomeText}>Welcome!</Text>
          <Animated.Text style={[styles.wave, { transform: [{ rotate }] }]}>
            👋
          </Animated.Text>
        </View>
        <Text style={styles.subText}>Discover our latest offers today.</Text>
      </View>

      <Text style={styles.sectionTitle}>Current Offers</Text>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={styles.offersContainer}
      >
        {offers.map((offer) => (
          <View key={offer.id} style={styles.offerCard}>
            <Image source={{ uri: offer.image }} style={styles.offerImage} />
            <View style={styles.offerTextContainer}>
              <Text style={styles.offerTitle}>{offer.title}</Text>
              <Text style={styles.offerDescription}>{offer.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  welcomeContainer: {
    backgroundColor: COLORS.primary,
    marginBottom: 10,
    padding: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
    marginRight: 8,
  },
  wave: {
    fontSize: 28,
  },
  subText: {
    fontSize: 16,
    color: "lightgrey",
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.accent,
    paddingLeft: 20,
    marginBottom: 15,
  },
  offersContainer: { marginBottom: 20 },
  offerCard: {
    width: width * 0.9,
    justifyContent: "center",
    alignSelf: "center",
    margin: 10,
    padding: 10,
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 5,
    elevation: 15,
  },
  offerImage: {
    width: "100%",
    height: 400,
    borderRadius: 15,
  },
  offerTextContainer: {
    padding: 10,
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },
  offerDescription: {
    fontSize: 14,
    color: COLORS.muted,
    marginTop: 5,
  },
});

export default HomeScreen;
