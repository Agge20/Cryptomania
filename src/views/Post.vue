<template>
    <section>
        <div class="post">
            <div>
                <h2 class="post__title">BTC to 100K</h2>
                <p class="post__content">
                    All Gaul is divided into three parts, one of which the Belgae inhabit, the
                    Aquitani another, those who in their own language are called Celts, in our
                    Gauls, the third. All these differ from each other in language, customs and
                    laws. The river Garonne separates the Gauls from the Aquitani; the Marne and the
                    Seine separate them from the Belgae. Of all these, the Belgae are the bravest,
                    because they are furthest from the civilization and refinement of [our]
                    Province, and merchants least frequently resort to them, and import those things
                    which tend to effeminate the mind; and they are the nearest to the Germans, who
                    dwell beyond the Rhine, with whom they are continually waging war; for which
                    reason the Helvetii also surpass the rest of the Gauls in valor, as they contend
                    with the Germans in almost daily battles, when they either repel them from their
                    own territories, or themselves wage war on their frontiers. One part of these,
                    which it has been said that the Gauls occupy, takes its beginning at the river
                    Rhone; it is bounded by the river Garonne, the ocean, and the territories of the
                    Belgae; it borders, too, on the side of the Sequani and the Helvetii, upon the
                    river Rhine, and stretches toward the north. The Belgae rises from the extreme
                    frontier of Gaul, extend to the lower part of the river Rhine; and look toward
                    the north and the rising sun. Aquitania extends from the river Garonne to the
                    Pyrenaean mountains and to that part of the ocean which is near Spain: it looks
                    between the setting of the sun, and the north star.
                </p>
            </div>
            <div class="post__sidebar">
                <div class="post__sidebar-votes">
                    <ThumbUp />
                    <ThumbDown />
                </div>
                <Chat class="post__sidebar-comments" />
            </div>
        </div>
    </section>
</template>

<script>
// svg
import ThumbUp from "../svg/ThumbUp.vue";
import ThumbDown from "../svg/ThumbDown.vue";
import Chat from "../svg/Chat.vue";

export default {
    components: {
        ThumbUp,
        ThumbDown,
        Chat,
    },
    setup() {
        return {};
    },
};
</script>

<style lang="scss" scoped>
section {
    @apply pt-6;
}
.post {
    @apply max-w-3xl bg-theme_dark_purple mx-auto p-6 flex min-w-full;
    &__title {
        @apply text-5xl text-theme_gold mb-2 font-montserrat font-semibold mt-0;
    }
    &__content {
        @apply text-theme_white font-roboto;
    }
    &__sidebar {
        @apply w-20 flex flex-col justify-between items-center pl-2;
        &-votes {
            @apply text-theme_white;
            svg {
                @apply h-8 w-9;
                &:first-child {
                    @apply mb-4;
                }
            }
        }
        &-comments {
            @apply text-theme_gold h-10 w-10;
        }
    }
}

@media screen and (max-width: $breakpoint-mobile) {
    /*  text wrapper */
    .post {
        @apply flex-col;
        &__title {
            @apply text-4xl;
        }

        &__sidebar {
            @apply flex-row w-full mt-4;
            &-votes {
                @apply text-theme_white flex items-center;
                svg {
                    @apply h-8 w-9;
                    &:first-child {
                        @apply mb-0 mr-2;
                    }
                }
            }
        }
    }
}
</style>
