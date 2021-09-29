<template>
    <div id="app">
        <Navbar></Navbar>
        <router-view/>
        <Footer></Footer>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
    name: 'App',
    created: function() {
        if(localStorage.getItem('access_token')) {
            this.$store.commit('CHANGE_IS_LOGGED_IN', true)
        } else {
            this.$store.commit('CHANGE_IS_LOGGED_IN', false)
        }
    },
    components: {
        Navbar,
        Footer
    }
}
</script>

<style>

</style>
