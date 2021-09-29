<template>
  <section id="register-page">
        <div class="container" style="width: 80vw; height: 70vh; margin-top: 10%;">
            <div class="text-center">
                <h1 class="title">Register a new account</h1>
            </div>

            <br>
            <div class="card">
                <div class="card-body">
                    <form id="register-form">
                        <div class="form-group">
                            <input class="form-control" type="email" id="register-email" placeholder="Email address" v-model='registerData.email'>
                        </div>
                        <div class="form-group">
                            <input class="form-control" type="password" id="register-password" placeholder="Password" v-model='registerData.password'>
                        </div>
                        <button type="button" class="btn btn-primary btn-block" @click='registerButtonHandler'>Register</button>
                    </form>

                    <br>
                    <div class="text-center">
                        <small>Already have an account?</small>&nbsp;&nbsp;
                        <router-link to="/login" class="btn btn-info btn-sm">Sign In</router-link><br>
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
    name: 'Register',
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
            registerData: {
                email: '',
                password: ''
            }
        }
    },
    components: {
        GoogleLogin
    },
    methods: {
        registerButtonHandler() {
            this.$store.dispatch('customerRegister', this.registerData)
        },
        onSuccess(googleUser) {
            this.$store.dispatch('googleLogin', googleUser)
        }
    }
}
</script>

<style>

</style>