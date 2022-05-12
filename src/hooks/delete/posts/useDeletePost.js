// vue imports
import { ref } from "vue";

import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase/index.js";

const useDeletePost = () => {
    // hooks
    const error = ref(null);
    const loading = ref(null);

    const deletePost = async (postId) => {
        loading.value = true;
        try {
            await deleteDoc(doc(db, "posts", postId));
            error.value = null;
            loading.value = false;
        } catch (err) {
            error.value = err;
            loading.value = false;
        }
    };

    return {
        deletePost,
        error,
        loading,
    };
};

export default useDeletePost;
