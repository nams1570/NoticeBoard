<template>
    <section class = "login-page">
        <div class = "login-box">
            <div class = "username-password">
                <h1>Username:</h1>
                <input>
                <h2>Password:</h2>
                <input>
                <h3>Repeat Password:</h3>
                <input>
            </div>
            <router-link :to="'/login'"></router-link>
            <div class = "sign-in">
                <button>Sign In</button> 
            </div>
        </div>
    </section>
</template>