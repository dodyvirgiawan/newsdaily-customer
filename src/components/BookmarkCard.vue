<template>
    <div class="card float-left" style="width: 30%; height: 10%; margin-left: 2%; margin-top: 2%; margin-bottom: 2%;">
        <img class="card-img-top" :src="news.imgUrl" :alt="news.title" style="width: 100%; height: 10vw; object-fit: cover;">
        <div class="card-body">
            <a href="" class="card-title" @click.prevent="showNewsDetail"><h5>{{ news.title }}</h5></a>
            <p class="card-text">{{ formattedContent }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BookmarkCard',
    props: ['news'],
    methods: {
        showNewsDetail() {
            this.$router.push({
                name: 'NewsDetailPage',
                params: { id: this.news.id }
            })
        }
    },
    computed: {
        formattedContent() {
            const charLimit = 300

            if(this.news.content.length > charLimit) {
                return `${this.news.content.split('').splice(0, charLimit).join('')}...`
            } else {
                return this.news.content
            }
        }
    }
}
</script>

<style>

</style>