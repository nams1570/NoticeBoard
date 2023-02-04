<template>
    <section class = "login-page">
        <div class = "login-box">
                <button class = "logo"></button>
            <div class = "username-password"> 
                <h1>Username:</h1>
                <input :value = "username" @input="onInputUsername" class = "text-input">
                <h2>Password:</h2>
                <input :value = "password" @input="onInputPassword" class = "text-input">
                <h2 class = "error-message">{{ this.errorMessage }}</h2>
            </div>
            <div class = "sign-in">
                <button @click="loginToWebsite"  class = "sign-in-button">Sign In</button> 
            </div>
            <router-link :to="'/signup'" class = "text-link">Sign up!</router-link>
            <div class = "oauth text-oauth">
                <h1 >Or, you can log in through</h1>
                <button  @click="requestProfileDetails" class = "google-oauth"></button> <br>
                 The Google <a href = "https://policies.google.com/privacy">Privacy Policy </a>and <a href = "https://policies.google.com/terms">Terms of Service</a> apply.
            </div>
            
        </div>
    </section>
</template>
<script>
import AuthService from "../services/AuthService.js"
export default{
    data(){
        return{
            username: "",
            password: "",
            errorMessage:""
        }
    },
    methods:{
    async requestProfileDetails()
        {
          window.open("http://localhost:8081/auth")
          
        },
    async onInputUsername(e)
    {
        this.username = e.target.value;
    },
    async onInputPassword(e)
    {
        this.password = e.target.value;
    },
    async loginToWebsite()
    {
        var loginObject = {username:this.username,password:this.password};
        try
        {
            await AuthService.verifyUsernamePassword(loginObject);
            this.emitter.emit("successful-login");
            //this.$emit('successful-login');
        }
        catch(e)
        {
            this.errorMessage = "username or password is incorrect";
            console.error(e)
        }
        console.log(this.errorMessage);
    }
    }
}
</script>

<style lang = "scss" scoped>
.login-page{
    height:100vh;
    background: url("../assets/FloatingBackground.png");
    background-position: center;
    background-size: cover;
    z-index:1;
}
.error-message{
    font-size:x-small;
    color:red;
}
.login-box{
    height:63%;
    width:18%;
    margin-left:40%;
    margin-right:50%;
    margin-top: 15%;
    background-color: white;
    border: 2px solid white;
    border-radius:15px;
    z-index:2;
    position:absolute;
    opacity:0.90;
}
.username-password{
    margin-left:15%;
    width:57%;
}
.sign-in{
    margin-left:30px;
    border-radius:5px;
    margin-top:10px;
}
.text-link{
    font-style: italic;
    font-size: small;
    margin-left: 20%;
}
.sign-in-button{
    width:84%;
    background-color: rgb(109, 103, 103);
    border:0px;
    cursor:pointer;
    border-radius:3px;
    height:30px;
    margin-left:5%;
    color:white;
}
.sign-in-button:hover{
    opacity:0.9;
}
.sign-in-button:active{
    opacity:1;
}
.oauth{
    height:30%;
    width:65%;
    margin-top:3px;
    margin-left:30px;
}
.text-oauth{
    font-size:smaller;
    color: gray;
    font-style: italic;
    margin-top:15px;
    margin-left:20%;
}
.google-oauth{
    background:url("../assets/google.png");
    height:30px;
    width:30px;
    background-position: center;
    background-size: cover;
    cursor:pointer;
    border:0px;
    margin-top:10px;
    margin-left:30%;
}
.google-oauth:hover{
    opacity:0.5;
}

.text-input{
    width:140%;
}
.logo{
    background:url("../../public/faviconA.png");
    background-position: center;
    background-size: cover;
    height:55px;
    width:47px;
    margin-left:40%;
    border:0px;
    margin-top:5px;
}
</style>
