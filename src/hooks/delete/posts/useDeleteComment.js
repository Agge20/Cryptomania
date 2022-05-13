// vue imports
import { ref } from "vue";
import { useStore } from "vuex";

import { doc, updateDoc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/index.js";

const useDeleteComment = () => {
    // vuex
    const store = useStore();

    // hooks
    const error = ref(null);
    const loading = ref(null);
    const filteredCommentData = ref([]);

    const deleteComment = async (postId, commentId) => {
        console.log("comment id : ", commentId);
        const docRef = doc(db, "posts", postId);
        const res = await getDoc(docRef);

        // get favorites
        if (res.exists()) {
            const postData = res.data();

            // filter away the desired comment from post comments

            for (let i = 0; i < postData.comments.length; i++) {
                if (postData.comments[i].commentId !== commentId) {
                    filteredCommentData.value.push(postData.comments[i]);
                    console.log("lorem: ", postData.comments[i]);
                }
            }

            try {
                error.value = null;
                // replace the user favorites with new filtered data
                await updateDoc(
                    docRef,
                    {
                        comments: filteredCommentData.value,
                    },
                    {
                        merge: true,
                    }
                );
            } catch (err) {
                loading.value = false;
                error.value = err;
                console.log(err);
            }
        }
    };

    return {
        deleteComment,
        error,
        loading,
    };
};

export default useDeleteComment;
