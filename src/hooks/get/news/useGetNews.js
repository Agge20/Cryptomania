import { ref } from "vue";

const useGetNews = () => {
  const news = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const URL = "https://crypto-news14.p.rapidapi.com/news/";

  const sources = ["theblockcrypto", "coindesk", "cointelegraph"];

  const getNews = async () => {
    loading.value = true;
    for (let i = 0; i < sources.length; i++) {
      try {
        error.value = null;
        const res = await fetch(URL + sources[i], {
          method: "GET",
          url: "https://crypto-news14.p.rapidapi.com/news/cointelegraph",
          headers: {
            "x-rapidapi-host": "crypto-news14.p.rapidapi.com",
            //temporary api-key steal if u want lol
            "x-rapidapi-key": "PLEASE API KEY HERE",
          },
        });
        const data = res.json();
        if (res.ok) {
          news.value.push(data);
          console.log("news is now: ", news.value);
        } else {
          error.value = "could not fetch articles...";
          loading.value = false;
        }
      } catch (err) {
        error.value = err;
        loading.value = false;
      }
    }
    loading.value = false;
  };

  return { news, loading, error, getNews };
};

export default useGetNews;
