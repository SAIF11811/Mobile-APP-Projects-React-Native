import { getTopHeadlines } from "@/app/services/newsApi";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import Loading from "../components/Loading";
import NewsCard from "../components/NewsCard";

const HomeScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    const data = await getTopHeadlines();
    setArticles(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNews();
    setRefreshing(false);
  };

  if (loading) return <Loading />;

  return (
    <View style={{ flex: 1, backgroundColor: "#5b5b5bff", padding: 10 }}>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <NewsCard
            article={item}
            onPress={() => navigation.navigate("Article", { article: item })}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default HomeScreen;
