import axios from "axios";
import { API_KEY, BASE_URL } from "../config";

export const getTopHeadlines = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: { country: "us", apiKey: API_KEY },
    });
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
