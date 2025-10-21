import React from "react";
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ArticleScreen = ({ route }) => {
  const { article } = route.params;

  const imageSource = article.urlToImage
    ? { uri: article.urlToImage }
    : require("@/assets/images/react-logo.png");

  return (
    <ScrollView style={styles.container}>
      <Image source={imageSource} style={styles.image} />

      <View style={styles.textContainer}>
        <Text style={styles.title}>{article.title}</Text>

        {article.author && (
          <Text style={styles.author}>By {article.author}</Text>
        )}

        <Text style={styles.content}>
          {article.content || article.description || "No content available."}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => Linking.openURL(article.url)}
      >
        <Text style={styles.buttonText}>Read Full Article</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2d2d2d",
    padding: 10,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 8,
    marginBottom: 15,
  },
  textContainer: {
    marginBottom: 25,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    color: "white",
  },
  author: {
    color: "#bfbfbf",
    marginBottom: 12,
    fontStyle: "italic",
  },
  content: {
    fontSize: 16,
    color: "#e0dfdf",
    lineHeight: 24,
  },
  button: {
    backgroundColor: "#3d3d3d",
    width: 220,
    paddingVertical: 12,
    borderRadius: 15,
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#ffffff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ArticleScreen;
