<template>
    <b-navbar>
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                SICK PROJECT
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item href="#">
                Home
            </b-navbar-item>
            <b-navbar-item href="#">
                Documentation
            </b-navbar-item>
            <b-navbar-dropdown label="Info">
                <b-navbar-item href="#">
                    About
                </b-navbar-item>
                <b-navbar-item href="#">
                    Contact
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div v-if="!user" class="buttons">
                    <button @click="handleRouteChange('signup')" class="button is-primary">
                        <strong>Sign up</strong>
                    </button>
                    <button @click="handleRouteChange('login')" class="button is-light">
                        Log in
                    </button>
                </div>
                <div v-if="user">
                    <button @click="handleRouteChange('profile')" class="button is-primary">
                        My Account
                    </button>
                    <button @click="logout()" class="button is-light">
                        Logout
                    </button>
                   
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
import axios from 'axios'
export default {
    name: "Navbar",
    data() {
        return {
            user: null,
        }
    },
    created() {
        axios.get('/api/v1/auth/current-user').then(res => {
            console.log(res);
            if (!res.data) this.user = res.data.user.username;
        }).catch(err => {
            console.log(err);
        })
    },
    methods: {
        handleRouteChange(destination) {
            if (destination == "signup") this.$router.push('/signup');
            if (destination == "login") this.$router.push('/login');
            if (destination == "profile") this.$router.push('/profile');
        },
        logout() {
            axios.get("/api/v1/auth/logout").then(res => {
                console.log(res);
                this.$router.push("/")
            }).catch(err => {
                console.log(err)
            })
        }
       
    }
}
</script>