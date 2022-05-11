import { ref } from "vue";
import { useStore } from "vuex";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/index.js";
import { uid } from "uid";

const useAddPost = () => {
    const error = ref(null);
    const loading = ref(null);
    const store = useStore();
    const postId = ref(null);

    // get data
    const addPost = async (postId) => {
        loading.value = true;
        error.value = null;

        // create the post
        await setDoc(doc(db, "posts", postId.value), {
            id: postId.value,
            authorId: store.state.user.uid,
            authorUsername: store.state.user.email,
            title,
            textContent,
            coinId,
            likes: 0,
            comments: [],
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
        addPost,
        loading,
        error,
        postId,
    };
};

export default useAddPost;
