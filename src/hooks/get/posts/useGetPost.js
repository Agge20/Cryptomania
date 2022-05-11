import { ref } from "vue";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/index.js";

const useGetPost = () => {
    // hooks
    const error = ref(null);
    const loading = ref(null);
    const postData = ref({});

    const getPost = async (postId) => {
        console.log("get post ran...");
        const docRef = doc(db, "posts", postId);
        try {
            loading.value = true;
            const res = await getDoc(docRef);

            if (res.exists()) {
                postData.value = res.data();
                loading.value = false;
                error.value = null;
            }
        } catch (err) {
            error.value = err;
            loading.value = false;
        }
    };

    return {
        getPost,
        error,
        loading,
        postData,
    };
};

export default useGetPost;
