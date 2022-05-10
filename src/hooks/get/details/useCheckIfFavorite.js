import { ref } from "vue";
import { useStore } from "vuex";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/index.js";

const useCheckIfFavorite = () => {
    // vuex
    const store = useStore();

    // hooks
    const error = ref(null);
    const loading = ref(null);
    const isFavorite = ref(null);

    const checkIfFavorite = async (coinId) => {
        const docRef = doc(db, "users", store.state.user.uid);
        try {
            loading.value = true;
            const res = await getDoc(docRef);

            if (res.exists()) {
                const favoritesData = res.data();
                loading.value = false;
                error.value = null;

                // filter away the desired coin from user favorites
                let checkIfFavorite = favoritesData.favorites.filter((coin) => coin === coinId);
                if (checkIfFavorite.length) {
                    isFavorite.value = true;
                } else {
                    isFavorite.value = false;
                }
            }
        } catch (err) {
            error.value = err;
            loading.value = false;
        }
    };

    return {
        checkIfFavorite,
        isFavorite,
        error,
        loading,
    };
};

export default useCheckIfFavorite;
