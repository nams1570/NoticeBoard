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
    border: 2px solid green;
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
    border:2px solid pink;
}
.username-password{
    margin-left:30px;
    width:50%;
    margin-top:30px;
    border: 2px solid green;
    float:left;
}
.sign-in{
    margin-left:30px;
    margin-top:15px;
    border-radius:15px;
}
.text-link{
    font-style: italic;
    font-size: small;
    margin-left: 30px;
}
.oauth{
    border:2px solid red;
    height:50%;
    width:30%;
    margin-left:65%;
    margin-top:3px;
}
.text-oauth{
    font-size:smaller;
    color: gray;
    font-style: italic;
}
</style>
