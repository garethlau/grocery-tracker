/* eslint-disable */
<template>
    <div>
        <h1>Login</h1>
        <form v-on:submit="login">
            Username: <input type="text" name="username"/><br>
            Password: <input type="text" name="password"/>
            <input type="submit" value="login"/>
        </form>
    </div>
</template>

<script>
import AuthService from '../services/AuthService';

const authService = new AuthService();
export default {
    name: "login",
    methods: {
        login: function(e) {
            e.preventDefault();
            let username = e.target.elements.username.value
            let password = e.target.elements.password.value
            let data = {
                username: username,
                password: password
            }
            console.log(data);
            authService.login(data).then((res) => {
                if (res.data.message == "User does not exist") {
                    console.log("user does not exist");
                }
                else if (res.data.message == "Incorrect password") {
                    console.log("incorrect pass");
                }
                else {
                    this.$router.push("/dashboard")
                }
            }).catch(err => {
                console.error(err);
            });
        }
    }
}
</script>
