import { ref } from "vue";

const useGetNews = () => {
  const newsSnapshot = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const URL = "https://crypto-news14.p.rapidapi.com/news/";

  const sources = ["theblockcrypto", "coindesk", "cointelegraph"];

  // get articles from cointelegraph for homepage
  const getNewsSnapshot = async () => {
    loading.value = true;
    // fetch news data from three different news sources

    try {
      error.value = null;
      const res = await fetch(URL + "cointelegraph", {
        method: "GET",
        url: "https://crypto-news14.p.rapidapi.com/news/cointelegraph",
        headers: {
          "x-rapidapi-host": "crypto-news14.p.rapidapi.com",
          //temporary api-key steal if u want lol
          "x-rapidapi-key": "",
        },
      });
      const data = await res.json();
      console.log("data: ", data);
      if (res.ok) {
        newsSnapshot.value = data;
      } else {
        error.value = "could not fetch articles...";
        loading.value = false;
      }
    } catch (err) {
      error.value = err;
      loading.value = false;
    }

    loading.value = false;
  };

  return { newsSnapshot, loading, error, getNewsSnapshot };
};

export default useGetNews;
