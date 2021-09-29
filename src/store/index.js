import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

import newsApi from '../apis/newsApi.js'
import happiApi from '../apis/happiApi.js'

import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(VueToast, {position: 'top-right'})
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLoggedIn: '',
        loggedInUser: {},
        news: [],
        bookmarks: [],
        newsDetail: {},
        qrCode: '',
    },
    mutations: {
        CHANGE_IS_LOGGED_IN(state, payload) {
            state.isLoggedIn = payload
        },

        CHANGE_LOGGED_IN_USER_INFO(state, payload) {
            state.loggedInUser = payload
        },

        CHANGE_NEWS(state, payload) {
            state.news = payload
        },

        CHANGE_BOOKMARKS(state, payload) {
            state.bookmarks = payload
        },

        CHANGE_NEWS_DETAIL(state, payload) {
            state.newsDetail = payload
        },

        CHANGE_QR_CODE(state, payload) {
            state.qrCode = payload
        }
    },
    actions: {
        async fetchNews(context, payload) {
            try {
                Vue.$toast.open({
                    message: 'Fetching news data... please wait',
                    type: 'info',
                })

                const { title, author, category, page, size } = payload

                const titleQuery = title ? `&title=${title}` : ''
                const authorQuery = author ? `&author=${author}` : ''
                const categoryQuery = category.length > 0 ? `&category=${encodeURIComponent(category.join(','))}` : ''
                const sizeQuery = size ? `&size=${size}` : ''
                const pageQuery = page ? `&page=${page}` : ''

                const access_token = localStorage.getItem('access_token')
                let axiosOptions = {}

                if(access_token) {
                    axiosOptions.headers = {
                        access_token: access_token
                    }
                }

                const response = await newsApi.get(`/customer/news/?${titleQuery}${authorQuery}${categoryQuery}${sizeQuery}${pageQuery}`, axiosOptions)
                context.commit('CHANGE_NEWS', response.data)
            } catch (err) {
                Vue.$toast.open({
                    message: err.response.data.message,
                    type: 'error',
                })
            }
        },

        async fetchNewsById(context, payload) { 
            try {
                Vue.$toast.open({
                    message: 'Acquiring news information..',
                    type: 'info',
                })

                const response = await newsApi({
                    method: 'GET',
                    url: `/customer/news/${payload}`
                })

                context.commit('CHANGE_NEWS_DETAIL', response.data)
            } catch (err) {
                Vue.$toast.open({
                    message: err.response.data.message,
                    type: 'error',
                })
            }
        },

        async customerLogin(context, payload) {
            try {
                const response = await newsApi({
                    method: 'POST',
                    url: '/customer/login',
                    data: {
                        email: payload.email,
                        password: payload.password
                    }
                })

                localStorage.setItem('access_token', response.data.access_token)
                context.commit('CHANGE_IS_LOGGED_IN', true)
                context.dispatch('getLoggedInUserInfo')
                context.dispatch('fetchBookmarks')
                router.push('/')

                Vue.$toast.open({
                    message: 'Successfully logged in!',
                    type: 'success',
                })
            } catch (err) {
                Vue.$toast.open({
                    message: err.response.data.message,
                    type: 'error',
                })
            }
        },

        async googleLogin(context, payload) {
            try {
                const id_token = payload.getAuthResponse().id_token;

                const response = await newsApi({
                    method: 'POST',
                    url: '/customer/auth/google',
                    data: { id_token }
                })

                localStorage.setItem('access_token', response.data.access_token)
                context.commit('CHANGE_IS_LOGGED_IN', true)
                context.dispatch('getLoggedInUserInfo')
                context.dispatch('fetchBookmarks')
                router.push('/')

                Vue.$toast.open({
                    message: 'Successfully logged in!',
                    type: 'success',
                })

            } catch (err) {
                Vue.$toast.open({
                    message: err.response.data.message,
                    type: 'error',
                })
            }
        },

        async getLoggedInUserInfo(context) {
            try {
                const response = await newsApi({
                    method: 'GET',
                    url: '/customer/users',
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })

                context.commit('CHANGE_LOGGED_IN_USER_INFO', response.data)
            } catch (err) {
                Vue.$toast.open({
                    message: err.response.data.message,
                    type: 'error',
                })
            }
        },

        async customerRegister(context, payload) {
            try {
                await newsApi({
                    method: 'POST',
                    url: '/customer/register',
                    data: {
                        email: payload.email,
                        password: payload.password
                    }
                })

                router.push('/login')

                Vue.$toast.open({
                    message: 'Successfully registered. Please proceed to login',
                    type: 'success',
                })
            } catch(err) {
                let errorMessages = ''

                if(Array.isArray(err.response.data.message)) {
                    err.response.data.message.forEach((el, idx) => {
                        errorMessages += `${el}`
                        errorMessages += idx === err.response.data.message.length - 1 ? '' : ',\n'
                    })
                } else {
                    errorMessages = err.response.data.message
                }

                Vue.$toast.open({
                    message: errorMessages,
                    type: 'error',
                })
            }
        },

        async bookmarkNews(context, payload) {
            try {
                const response = await newsApi({
                    method: 'POST',
                    url: `/customer/bookmarks/${payload}`,
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })

                Vue.$toast.open({
                    message: response.data.message,
                    type: 'success',
                })
                
            } catch (err) {
                Vue.$toast.open({
                    message: err.response.data.message,
                    type: 'error',
                })
            }
        },

        async fetchBookmarks(context) {
            try {
                Vue.$toast.open({
                    message: 'Fetching your bookmarks...',
                    type: 'info',
                })

                const response = await newsApi({
                    method: 'GET',
                    url: '/customer/bookmarks',
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })

                context.commit('CHANGE_BOOKMARKS', response.data)
            } catch (err) {
                Vue.$toast.open({
                    message: err.response.data.message,
                    type: 'error',
                })
            }
        },

        async fetchQrCode(context, payload) {
            try {
                const response = await happiApi({
                    method: 'GET',
                    url: `/qrcode?data=${payload}`
                })

                context.commit('CHANGE_QR_CODE', response.data.qrcode)
            } catch (err) {
                Vue.$toast.open({
                    message: err.response.data.message,
                    type: 'error',
                })
            }
        }
    },
    modules: {
    }
})
