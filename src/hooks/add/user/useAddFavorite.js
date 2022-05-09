import { ref } from "vue";
import { useStore } from "vuex";
import { doc, setDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../../firebase/index.js";

const useAddFavorite = () => {
    const error = ref(null);
    const loading = ref(null);
    const store = useStore();
    // get data
    const addFavorite = async (coinId) => {
        loading.value = true;

        try {
            error.value = null;
            console.log("try ran...");
            console.log(store.state.user);
            const res = await setDoc(
                doc(db, "users", store.state.user.uid),
                {
                    favorites: arrayUnion(coinId),
                },
                { merge: true }
            );
        } catch (err) {
            loading.value = false;
            error.value = err;
            console.log(err);
        }
    };

    return {
        addFavorite,
    };
};

export default useAddFavorite;
