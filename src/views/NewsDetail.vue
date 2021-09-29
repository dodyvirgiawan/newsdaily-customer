<template>
    <section id="newsdetailpage">
        <div class="container" v-if="Object.keys(newsDetail).length !== 0">
            <br>
            <div class="card">
                <img class="card-header" :src="newsDetail.imgUrl" style="width: 100%; height: 30vw; object-fit: cover; padding: 0px;">
                <div class="card-body">
                    <h1 class="card-title">{{ newsDetail.title }}</h1>
                    <hr>

                    <div class="d-flex flex-row justify-content-between">
                        <div class="d-flex flex-column">
                            <h3 class="text-center" style="background-color: #4d2dff; color: white; border-radius: 5px; padding: 5px;">{{ newsDetail.Category.name }}</h3>
                            <hr>
                            <p class="card-text" style="margin: 0px">Written by <span style="color: #4d2dff">{{ newsDetail.User.email }}</span></p>
                        </div>
                        <div v-if="qrCode" class="qrcode">
                            <h6 class="text-center">Share this news</h6>
                            <img :src="qrCode" style="width: 10em; border-radius: 5px;">
                        </div>
                    </div>
                    
                    <hr>
                    <p class="card-text">
                        {{ newsDetail.content }}
                    </p>

                    <button
                        @click="goToPreviousPage"
                        class="btn btn-primary"
                    >Go back</button>
                </div>
            </div>
        </div>

    </section>
</template>

<script>
export default {
    name: 'NewsDetailPage',
    created: function() {
        const id = this.$route.params.id
        this.$store.dispatch('fetchNewsById', id)
        this.$store.dispatch('fetchQrCode', `${process.env.VUE_APP_BASE_CLIENT_URL}/news/${id}`)
    },
    methods: {
        goToPreviousPage() {
            this.$router.go(-1)
        }
    },
    computed: {
        newsDetail() {
            return this.$store.state.newsDetail
        },

        isLoggedIn() {
            return this.$store.state.isLoggedIn
        },

        loggedInUser() {
            return this.$store.state.loggedInUser
        },

        qrCode() {
            return this.$store.state.qrCode
        }
    }
}
</script>

<style>

</style>