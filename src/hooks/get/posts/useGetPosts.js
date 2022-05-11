import { ref } from "vue";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../../../firebase/index.js";

const useGetPosts = () => {
    // hooks
    const error = ref(null);
    const loading = ref(null);
    const postsData = ref([]);

    const getPosts = async () => {
        const querySnapshot = await getDocs(collection(db, "cities"));

        try {
            loading.value = true;
            const querySnapshot = await getDocs(collection(db, "posts"));
            querySnapshot.forEach((doc) => {
                postsData.value.push(doc.data());
            });

            console.log("postsData: ", postsData.value);

            loading.value = false;
            error.value = null;
        } catch (err) {
            error.value = err;
            loading.value = false;
        }
    };

    return {
        getPosts,
        error,
        loading,
        postsData,
    };
};

export default useGetPosts;
