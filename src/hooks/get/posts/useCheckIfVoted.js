import { ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/index.js";

const useCheckIfVoted = () => {
    // vuex
    const store = useStore();
    const route = useRoute();
    // hooks
    const error = ref(null);
    const loading = ref(null);
    const votedLiked = ref(false);
    const votedDisliked = ref(false);

    const checkIfVoted = async (postId) => {
        const docRef = doc(db, "users", store.state.user.uid);
        try {
            loading.value = true;

            onSnapshot(docRef, (doc) => {
                loading.value = false;
                error.value = null;
                const userData = doc.data();

                if (userData.votedPosts) {
                    // check if user has voted for this specific post before
                    for (let i = 0; i < userData.votedPosts.length; i++) {
                        // user has either disliked or liked the post
                        if (userData.votedPosts[i].postId === postId) {
                            if (userData.votedPosts[i].liked === true) {
                                votedLiked.value = true;
                                votedDisliked.value = false;
                            } else {
                                votedDisliked.value = true;
                                votedLiked.value = false;
                            }
                        }
                    }
                }
            });
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
