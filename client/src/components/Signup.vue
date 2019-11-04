/* eslint-disable */
<template>
    <div>
        <h1>Signup</h1>
        <form v-on:submit="signup">
            Email: <input type="text" name="email"/><br>
            Username: <input type="text" name="username"/><br>
            Password: <input type="text" name="password"/>
            <input type="submit" value="signup"/>
        </form>
    </div>
</template>

<script>
import AuthService from '../services/AuthService';

const authService = new AuthService();
export default {
    name: "Signup",
    methods: {
        signup: function(e) {
            e.preventDefault();
            let email = e.target.elements.email.value
            let username = e.target.elements.username.value
            let password = e.target.elements.password.value
            let data = {
                email: email,
                username: username,
                password: password
            }
            console.log(data);
            authService.signup(data).then((res) => {
                if (res.data.message == "Email already exists") {
                    console.log("Email already exists");
                }
                else if (res.data.message == "Error saving the new user") {
                    console.log("Error saving the new user");
                }
                else {
                    this.$router.push("/nice")
                }
            }).catch(err => {
                console.error(err);
            });
        }
    }
}
</script>
