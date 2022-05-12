import { ref } from "vue";
import { useStore } from "vuex";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/index.js";

const useCheckIfVoted = () => {
    // vuex
    const store = useStore();

    // hooks
    const error = ref(null);
    const loading = ref(null);
    const votedLiked = ref(false);
    const votedDisliked = ref(false);

    const checkIfVoted = async (postId) => {
        const docRef = doc(db, "users", store.state.user.uid);
        try {
            loading.value = true;
            const res = await getDoc(docRef);

            if (res.exists()) {
                const userData = res.data();
                console.log("userData: ", userData);
                loading.value = false;
                error.value = null;

                // check if user has voted for this specific post before
                for (let i = 0; i < userData.votedPosts.length; i++) {
                    // user has either disliked or liked the post
                    if (userData.votedPosts[i].postId === postId) {
                        if (userData.votedPosts[i].liked === true) {
                            votedLiked.value = true;
                        } else {
                            votedDisliked.value = true;
                        }
                    }
                }
            } else {
                loading.value = false;
            }
        } catch (err) {
            error.value = err;
            loading.value = false;
        }
    };

    return {
        checkIfVoted,
        votedLiked,
        votedDisliked,
        error,
        loading,
    };
};

export default useCheckIfVoted;
