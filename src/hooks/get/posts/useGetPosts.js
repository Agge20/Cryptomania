import { ref } from "vue";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import { db } from "../../../firebase/index.js";

const useGetPosts = () => {
    // hooks
    const error = ref(null);
    const loading = ref(null);
    const postsData = ref([]);

    const getPosts = async () => {
        try {
            loading.value = true;
            const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));

            onSnapshot(q, (docs) => {
                postsData.value = [];
                docs.forEach((doc) => {
                    postsData.value.push(doc.data());
                });
            });

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
