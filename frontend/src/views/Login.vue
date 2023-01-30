<template>
    <section class = "login-page">
        <div class = "login-box">
            <div class = "username-password">
                
            </div>
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
}
</style>
