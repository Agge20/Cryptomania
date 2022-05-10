import { ref } from "vue";
import { useStore } from "vuex";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/index.js";

const useGetUserFavorites = () => {
    const store = useStore();
    const favoritesData = ref([]);
    const error = ref(null);
    const loading = ref(null);

    // get data
    const getUserFavorites = async () => {
        try {
            error.value = null;
            loading.value = true;

            const docRef = doc(db, "users", store.state.user.uid);
            const res = await getDoc(docRef);

            // if user favorites ids have been fetched
            if (res.exists()) {
                let userData = res.data();
                let URLParams = "https://api.coingecko.com/api/v3/ping";
                let URL;
                for (let i = 0; i < userData.favorites.length; i++) {
                    URLParams = URLParams + `${userData.favorites[i]}%2C%20`;
                }

                // fetch the favorite coins from api
                try {
                    URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${URLParams}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
                    const res = await fetch(URL);
                    const data = await res.json();
                    if (res.ok) {
                        favoritesData.value = data;
                        loading.value = false;
                        error.value = null;
                    } else {
                        loading.value = false;
                        error.value = "We apologize as we could unfortunately not fetch the data.";
                    }
                } catch (err) {
                    loading.value = false;
                    error.value = err;
                }
            } else {
                loading.value = false;
                error.value = "We apologize as we could unfortunately not fetch the data.";
            }
        } catch (err) {
            loading.value = false;
            error.value = err;
        }
    };

    return {
        getUserFavorites,
        favoritesData,
        error,
        loading,
    };
};

export default useGetUserFavorites;
