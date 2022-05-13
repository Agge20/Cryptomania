import { ref } from "vue";
import { useStore } from "vuex";

import { collection, onSnapshot, where, query } from "firebase/firestore";

import { db } from "../../../firebase/index.js";

const useGetPosts = () => {
    // hooks
    const error = ref(null);
    const loading = ref(null);
    const postsData = ref([]);
    const store = useStore();
    let unsub;

    const getPosts = async () => {
        loading.value = true;
        error.value = null;
        const q = query(collection(db, "posts"), where("authorId", "==", store.state.user.uid));

        unsub = onSnapshot(
            q,
            (docs) => {
                postsData.value = [];

                docs.forEach((doc) => {
                    postsData.value.push(doc.data());
                });
                loading.value = false;
                error.value = null;
            },
            (err) => {
                loading.value = false;
                error.value = err;
            }
        );
    };

    const unsubFromSnapshot = () => {
        unsub();
    };

    return {
        getPosts,
        error,
        loading,
        postsData,
        unsubFromSnapshot,
    };
};

export default useGetPosts;
