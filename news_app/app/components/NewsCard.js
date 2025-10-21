import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const NewsCard = ({ article, onPress }) => {
  const imageSource = article.urlToImage
    ? { uri: article.urlToImage }
    : require("@/assets/images/react-logo.png");
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{article.title}</Text>
        {article.description && (
          <Text numberOfLines={2} style={styles.description}>
            {article.description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#2b2b2bff",
    borderRadius: 15,
    overflow: "hidden",
    margin: 12,
    elevation: 3,
  },
  image: {
    height: 180,
    width: "100%",
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
    color: "white",
  },
  description: {
    color: "#adaaaaff",
    fontSize: 14,
  },
});

export default NewsCard;
