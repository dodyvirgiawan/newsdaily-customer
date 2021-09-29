<template>
  <section id="login-page">
        <div class="container" style="width: 80vw; height: 70vh; margin-top: 10%;">
            <div class="text-center">
                <h1 class="title">Login to your account</h1>
            </div>

            <br>
            <div class="card">
                <div class="card-body">
                    <form id="login-form">
                        <div class="form-group">
                            <input class="form-control" type="email" id="login-email" placeholder="Email address" v-model="loginData.email">
                        </div>
                        <div class="form-group">
                            <input class="form-control" type="password" id="login-password" placeholder="Password" v-model="loginData.password">
                        </div>
                        <button type="button" class="btn btn-primary btn-block" @click="loginButtonHandler">Login</button>
                    </form>

                    <br>
                    <div class="text-center">
                        <small>Don't have an account yet?</small>&nbsp;&nbsp;
                        <router-link to="/register" class="btn btn-info btn-sm">Sign Up</router-link><br>
                        <small>or Sign In with Google Account</small><br><br>

                        <GoogleLogin 
                            :params="params" 
                            :renderParams="renderParams" 
                            :onSuccess="onSuccess" 
                            style="width: 100px; height: 30px; margin: auto"
                        ></GoogleLogin>
                        
                    </div>
                </div>
            </div>
            <br>

        </div>
    </section>
</template>

<script>
import GoogleLogin from 'vue-google-login'

export default {
    name: 'Login',
    data: function() {
        return {
            params: {
                client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID
            },
            renderParams: {
                width: 100,
                height: 30,
                longtitle: false
            },
            loginData: {
                email: '',
                password: ''
            }
        }
    },
    components: {
        GoogleLogin
    },
    methods: {
        loginButtonHandler() {
            this.$store.dispatch('customerLogin', this.loginData)
        },
        onSuccess(googleUser) {
            this.$store.dispatch('googleLogin', googleUser)
        }
    }
}
</script>

<style>

</style>