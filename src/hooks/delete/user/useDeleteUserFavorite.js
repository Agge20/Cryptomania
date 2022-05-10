// vue imports
import { ref } from "vue";
import { useStore } from "vuex";

import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/index.js";

const useDeleteUserFavorite = () => {
    // vuex
    const store = useStore();

    // hooks
    const error = ref(null);
    const loading = ref(null);
    const filteredFavoritesData = ref([]);

    const deleteUserFavorite = async (coinId) => {
        const docRef = doc(db, "users", store.state.user.uid);
        const res = await getDoc(docRef);
        const favoritesData = res.data();

        // get favorites
        if (res.exists()) {
            // filter away the desired coin from user favorites
            filteredFavoritesData.value = favoritesData.favorites.filter((coin) => coin !== coinId);
            try {
                error.value = null;
                // replace the user favorites with new filtered data
                await setDoc(doc(db, "users", store.state.user.uid), {
                    favorites: filteredFavoritesData.value,
                });
            } catch (err) {
                loading.value = false;
                error.value = err;
                console.log(err);
            }
        }
    };

    return {
        deleteUserFavorite,
        error,
        loading,
    };
};

export default useDeleteUserFavorite;
