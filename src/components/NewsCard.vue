<template>
    <div class="card float-left" style="width: 30%; height: 10%; margin-left: 2%; margin-top: 2%; margin-bottom: 2%;">
        <img class="card-img-top" :src="newsData.imgUrl" :alt="newsData.title" style="width: 100%; height: 8vw; object-fit: cover;">
        <br>
        <span class="d-flex flex-row justify-content-around">
            <span style="background-color: #4d2dff; border-radius: 5px; padding: 5px; color: white;">
                {{ newsData.Category.name }}
            </span>
            <span v-if="isLoggedIn && loggedInUser.role === 'customer'">
                <button type="button" class="btn btn-info btn-sm" @click.prevent="bookmarkNews"><strong>+</strong></button>
            </span>
        </span>
        <div class="container card-body" style="height: 20vw;">

            <router-link 
                :to="{name: 'NewsDetailPage', params: { id: newsData.id }}" 
                class="card-title"
            ><h5>{{ newsData.title }}</h5></router-link>

            <p class="card-text"><small class="text-muted">Posted by {{ newsData.User.email }}</small></p>
            <p class="card-text">{{ formattedContent }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NewsCard',
    props: ['news'],
    data: function() {
        return {
            newsData: [],
        }
    },
    methods: {
        bookmarkNews() {
            this.$store.dispatch('bookmarkNews', this.newsData.id)
        }
    },
    created: function() {
        this.newsData = this.news
    },
    computed: {
        formattedContent() {
            const charLimit = 140

            if(this.newsData.content.length > charLimit) {
                return `${this.newsData.content.split('').splice(0, charLimit).join('')}...`
            } else {
                return this.newsData.content
            }
        },

        isLoggedIn() {
            return this.$store.state.isLoggedIn
        },

        loggedInUser() {
            return this.$store.state.loggedInUser
        }
    }
}
</script>

<style>

</style>