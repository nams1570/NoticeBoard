<template>
    <section class = "login-page">
        <div class = "login-box">
            <div class = "username-password"> 
                <h1>Username:</h1>
                <input>
                <h2>Password:</h2>
                <input>
            </div>
            <div class = "oauth">
                <h1 class = "text-oauth">Or, you can log in through</h1>
                <button class = "google-oauth"></button>
            </div>
            <div class = "sign-in">
                <button>Sign In</button> 
            </div>
            <router-link :to="'/signup'" class = "text-link">Don't have an account? Sign up!</router-link>
        </div>
    </section>
</template>
<style lang = "scss" scoped>
.login-page{
    height:100vh;
    background: url("../assets/FloatingBackground.png");
    background-position: center;
    background-size: cover;
    z-index:1;
}
.login-box{
    height:40%;
    width:35%;
    margin-left:30%;
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
    margin-left:30px;
    width:50%;
    margin-top:30px;
    float:left;
}
.sign-in{
    margin-left:30px;
    margin-top:15px;
    border-radius:5px;
}
.text-link{
    font-style: italic;
    font-size: small;
    margin-left: 30px;
}
.oauth{
    height:50%;
    width:30%;
    margin-left:65%;
    margin-top:3px;
}
.text-oauth{
    font-size:smaller;
    color: gray;
    font-style: italic;
    margin-top:15px;
}
.google-oauth{
    background:url("../assets/google.png");
    height:30px;
    width:30px;
    background-position: center;
    background-size: cover;
    cursor:pointer;
    border:0px;
    margin-top:20px;
    margin-left:30%;
}
.google-oauth:hover{
    opacity:0.5;
}
</style>
