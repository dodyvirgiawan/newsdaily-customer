<template>
    <nav class="news-navbar navbar navbar-expand-lg navbar-light">
        <div class="container">
            <router-link to="/" class="title">News Daily</router-link>
            
            <ul class="navbar-nav">
                <li class="nav-item">

                    <router-link 
                        to="/" 
                        class="nav-link"
                        style="color: #4d2dff"
                    >Home</router-link>

                </li>

                <li class="nav-item">

                    <router-link 
                        to="/login" 
                        class="nav-link"
                        v-if="!isLoggedIn"
                        style="color: #4d2dff"
                    >Sign In</router-link>

                </li>

                <li class="nav-item">

                    <router-link 
                        to="/register" 
                        class="nav-link"
                        v-if="!isLoggedIn"
                        style="color: #4d2dff"
                    >Sign Up</router-link>

                </li>

                <li class="nav-item">

                    <router-link 
                        to="/bookmark" 
                        class="nav-link"
                        v-if="isLoggedIn && loggedInUser.role === 'customer'"
                        style="color: #4d2dff"
                    >My Bookmark</router-link>

                </li>

                <li class="nav-item">

                    <a 
                        style="cursor: pointer; color: #4d2dff"
                        class="nav-link" 
                        v-if="isLoggedIn && !loggedInUser.isGoogleUser"
                        @click="logoutButtonHandler"
                    >Logout</a>

                    <div v-if="isLoggedIn && loggedInUser.isGoogleUser" @click="logoutButtonHandler">

                        <GoogleLogin 
                            style="cursor: pointer; border: none; background-color: rgb(0,0,0,0); color: #4d2dff"
                            class="nav-link" 
                            :params="params" 
                            :logoutButton=true
                        >Logout</GoogleLogin>

                    </div>
                </li>
            </ul>

        </div>
    </nav>
</template>

<script>
import GoogleLogin from 'vue-google-login'

export default {
    name: 'Navbar',
    data: function() {
        return {
            params: {
                client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID
            }
        }
    },
    created: function() {
        if(this.isLoggedIn) {
            this.$store.dispatch('getLoggedInUserInfo')
        }
    },
    computed: {
        isLoggedIn() {
            return this.$store.state.isLoggedIn
        },

        loggedInUser() {
            return this.$store.state.loggedInUser
        }
    },
    methods: {
        logoutButtonHandler() {
            localStorage.removeItem('access_token')
            this.$store.commit('CHANGE_IS_LOGGED_IN', false)
            this.$store.commit('CHANGE_LOGGED_IN_USER_INFO', {})
            this.$router.push('/login')
        }
    },
    components: {
        GoogleLogin
    }
}
</script>

<style>

</style>