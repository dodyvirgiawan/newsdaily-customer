<template>
    <div class="homepage">
        <div class="container" style="margin-top: 1%;">
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <div class="carousel-caption">
                            <h3>Delta variant travel: Latest restrictions and news for concerned tourists</h3>
                            <p>The 2021 summer travel season started out full of hope and promise, but increasingly by the week, the Delta variant is throwing it in disarray.</p>
                        </div>
                        <img class="d-block w-100" src="https://ik.imagekit.io/cerihx9zwh7/deltavariant_NxyjP4uD-.jpg" alt="Second slide" style="border-radius: 10px;">
                    </div>
                    <div class="carousel-item">
                         <div class="carousel-caption">
                            <h3>What's the best pizza city in the USA? 'Modernist' authors have a surprise for you</h3>
                            <p>The honor of best pizza city in the United States goes not to those traditional standard bearers of pizza but instead to that innovative West Coast upstart of Portland, Oregon.</p>
                        </div>
                        <img class="d-block w-100" src="https://ik.imagekit.io/cerihx9zwh7/pizza_4h19v-2sw.jpg?updatedAt=1629185021692" alt="First slide" style="border-radius: 10px;">
                    </div>
                    <div class="carousel-item">
                        <div class="carousel-caption">
                            <h3>Piranhas and pink dolphins lure visitors to remote Lake Tarapoto</h3>
                            <p>Pink dolphins, piranhas and black caiman. It sounds like the stuff of legend, but in fact they're the inhabitants of a protected wetlands system in the Amazon, home to thousands of rare animal species and fascinating tales of tribal gods turning men into dolphins.</p>
                        </div>
                        <img class="d-block w-100" src="https://ik.imagekit.io/cerihx9zwh7/piranha_8PmCBWgby.jpg?updatedAt=1629350925900" alt="Third slide" style="border-radius: 10px;">
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>

            <div class="d-flex" style="margin-top: 2%;">
                <div class="col-3.5 sidebar-news">
                    <div class="container">
                         <div class="d-flex flex-column">
                            <br>
                            <div class="p-2">
                                <h3>News Category</h3>
                            </div>
                            <hr>

                            <CategoryList
                                v-for="(category, index) in categoryList" 
                                :key="`${category}-${index}`" 
                                :category="category"
                                @updateCategoryQuery='updateCategoryQuery'
                            ></CategoryList>
                            

                            <div class="p-2">
                                <br>
                                <h3>News Title</h3>
                                <hr>

                                <div class="p-2">
                                    <input type="text" class="form-control" placeholder="enter news title to search" v-model="newsQuery.title">
                                </div>
                            </div>

                            <div class="p-2">
                                <br>
                                <h3>News Author</h3>
                                <hr>
                                <div class="p-2">
                                    <input type="text" class="form-control" placeholder="enter author's email" v-model="newsQuery.author">
                                </div>
                            </div>

                            <div class="p-2">
                                <button type="button" class="btn btn-primary btn-block" @click="fetchNews">Search</button>
                                <button type="button" class="btn btn-light btn-block" @click="resetQuery">Clear Search</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-9 news-list" v-if="news">
                    <div class="container flex-wrap" v-if="news.length > 0">
                        <NewsCard
                            v-for="eachNews in news" :key="eachNews.id"
                            :news="eachNews"
                            @updateNews="fetchNews"
                        ></NewsCard>
                    </div>
                    <div class="container flex-wrap" v-if="news.length === 0">
                        <div class="d-flex justify-content-center align-items-center" style="margin-top: 10%;">
                            <span class="text-center">
                                <img src="https://cdn.dribbble.com/users/1058271/screenshots/3308780/sadbox_2x.png?compress=1&resize=400x300">
                                <h3>Sorry, no news matching your criteria</h3>
                                <small>Try narrowing your search filters, or <a href="#" @click.prevent="resetQuery">click here</a> to clear the filters.</small>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <br>
            <div class="d-flex flex-row-reverse">
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item" v-for="(page, index) in totalPages" :key="index" @click.prevent="showPage(page)"><a class="page-link" href="#">{{ index + 1 }}</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
import NewsCard from '../components/NewsCard.vue'
import CategoryList from '../components/CategoryList.vue'

export default {
    name: 'Homepage',
    data: function() {
        return {
            categoryList: ['Technology', 'Business', 'Travel & Tourism', 'Art & Culture'],
            newsQuery: {
                category: [],
                title: '',
                author: '',
                page: 1,
                size: 6
            }
        }
    },
    methods: {
        updateCategoryQuery(payload) {
            if(payload.type === 'add') {
                this.newsQuery.category.push(payload.category)
            } else if(payload.type === 'delete') {
                this.newsQuery.category = this.newsQuery.category.filter(category => category !== payload.category)
            }
        },

        resetQuery() {
            this.newsQuery = {
                category: [],
                title: '',
                author: '',
                page: 1,
                size: 6
            }

            this.fetchNews()
        },

        showPage(page) {
            this.newsQuery.page = page
            this.fetchNews()
        },

        fetchNews() {
            this.$store.dispatch('fetchNews', this.newsQuery)
        }
    },
    components: {
        NewsCard,
        CategoryList
    },
    created: function() {
        this.fetchNews()

        if(this.isLoggedIn) {
            this.$store.dispatch('getLoggedInUserInfo')
        }
    },
    computed: {
        news() {
            return this.$store.state.news.news
        },

        totalPages() {
            return this.$store.state.news.totalPages
        },

        isLoggedIn() {
            return this.$store.state.isLoggedIn
        },

        loggedInUser() {
            return this.$store.state.loggedInUser
        },
    }
}
</script>
