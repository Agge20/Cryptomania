import { ref } from "vue";
import { useStore } from "vuex";
import { doc, updateDoc, arrayUnion, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase/index.js";
import { uid } from "uid";

const useAddComment = () => {
    const error = ref(null);
    const loading = ref(null);
    const store = useStore();

    // get data
    const addComment = async (postId, commentData) => {
        const commentId = uid();
        loading.value = true;
        error.value = null;
        let newDate = new Date();

        // update the post
        await updateDoc(doc(db, "posts", postId), {
            comments: arrayUnion({
                commentId,
                authorId: store.state.user.uid,
                authorUsername: store.state.user.email,
                timestamp: newDate,
                comment: commentData,
            }),
        })
            .then(() => {
                loading.value = false;
                error.value = false;
            })
            .catch((err) => {
                error.value = err;
                loading.value = false;
            });
    };

    return {
        addComment,
        loading,
        error,
    };
};

export default useAddComment;
