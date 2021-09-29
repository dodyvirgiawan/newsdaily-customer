<template>
  <section id="bookmark-page" style="margin-top: 2%;">
        <div class="text-center" style="height: 70vh" v-if="bookmarks.length === 0">
            <img src="https://cdn.dribbble.com/users/1058271/screenshots/3308780/sadbox_2x.png?compress=1&resize=400x300">
            <div class="d-flex justify-content-center align-items-center">
                <span class="text-center">
                    <h3>Your bookmarks is empty</h3>
                    <small>Start browsing our news and add them to your bookmark list.
                        <br> 
                        <router-link to="/" >Click here</router-link> to browse news.</small>
                </span>
            </div>
        </div>

        <div v-if="bookmarks.length > 0">
            <div class="container text-center">
                <h1>Bookmark list</h1>
            </div>

            <div class="container">
                <div class="d-flex flex-wrap">

                        <BookmarkCard
                            v-for="news in bookmarks" 
                            :key="news.id"
                            :news="news" 
                        ></BookmarkCard>

                </div>
            </div>
        </div>
  </section>
</template>

<script>
import BookmarkCard from '../components/BookmarkCard.vue'

export default {
    name: 'Bookmark',
    components: {
        BookmarkCard
    },
    created: function() {
        this.$store.dispatch('fetchBookmarks')
    },
    computed: {
        bookmarks() {
            return this.$store.state.bookmarks
        }
    }
}
</script>

<style>

</style>