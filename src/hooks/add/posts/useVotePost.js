// vuex
import { useStore } from "vuex";

import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    increment,
    arrayUnion,
    arrayRemove,
} from "firebase/firestore";
import { db } from "../../../firebase/index.js";

const useVotePost = () => {
    const store = useStore();

    const votePost = async (postId, shouldIncrement) => {
        // refs
        const userDocRef = doc(db, "users", store.state.user.uid);
        const postRef = doc(db, "posts", postId);

        const userDocument = (await getDoc(userDocRef)).data();

        if (shouldIncrement) {
            let alreadyLiked = false;
            // check if user has already liked this post
            if (userDocument.votedPosts) {
                for (let i = 0; i < userDocument.votedPosts.length; i++) {
                    if (userDocument.votedPosts[i].postId === postId) {
                        if (userDocument.votedPosts[i].liked === true) {
                            alreadyLiked = true;
                        }
                    }
                }
            }

            // if user has NOT already liked this post
            if (!alreadyLiked) {
                await updateDoc(postRef, {
                    likes: increment(1),
                });

                await updateDoc(userDocRef, {
                    votedPosts: arrayRemove({
                        postId: postId,
                        liked: false,
                    }),
                });
                await updateDoc(userDocRef, {
                    votedPosts: arrayUnion({
                        postId: postId,
                        liked: true,
                    }),
                });
            }
        } else {
            let alreadyLiked = false;
            // check if user has already liked this post
            if (userDocument.votedPosts) {
                for (let i = 0; i < userDocument.votedPosts.length; i++) {
                    if (userDocument.votedPosts[i].postId === postId) {
                        if (userDocument.votedPosts[i].liked !== true) {
                            alreadyLiked = true;
                        }
                    }
                }
            }

            // if user has NOT already liked this post
            if (!alreadyLiked) {
                await updateDoc(postRef, {
                    likes: increment(-1),
                });
                await updateDoc(userDocRef, {
                    votedPosts: arrayRemove({
                        postId: postId,
                        liked: true,
                    }),
                });
                await updateDoc(userDocRef, {
                    votedPosts: arrayUnion({
                        postId: postId,
                        liked: false,
                    }),
                });
            }
        }
    };

    return { votePost };
};

export default useVotePost;
