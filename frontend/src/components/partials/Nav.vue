<template>
    <nav class="navbar container" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <strong class="is-size-4">Bananas</strong>
        </a>
        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbar" class="navbar-menu">
        <div class="navbar-start">
          <router-link to="/" class="navbar-item">Home</router-link>
          <router-link to="/about" class="navbar-item">About</router-link>
          <router-link to="/settings" class="navbar-item">Settings</router-link>

        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div  v-if="!isLoggedIn" class="buttons">
              <a @click="requestProfileDetails" class="button is-dark">
                  <strong>Sign In</strong>
              </a>
            </div>
            <div class = "profile-display" v-else> 
              <strong> Welcome, {{ result.username }} </strong>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </template>
  <script>
    export default {
      name: 'Nav',
      data(){
        return{
          result:{},
          isLoggedIn: false
        }
      },
      mounted()
      {
        this.emitter.on("successful-login",(loginResult)=>{
          console.log("Ya did it!");
          console.log("Hi"+JSON.stringify(loginResult));
          this.isLoggedIn = true;
          try 
          {
            this.result = loginResult;
            console.log("login suc")
          }
          catch{
            console.log("error in this.result");
          }
          sessionStorage.setItem("isLoggedIn",true)
          sessionStorage.setItem("loginUsername",this.result.username)
        })
      },
      created(){
        this.result = {username:sessionStorage.getItem("loginUsername")}
      this.isLoggedIn = sessionStorage.getItem("isLoggedIn")
      console.log(`Now isLoggedIn in Nav is ${this.isLoggedIn}`)
      console.log("Result in Nav is "+JSON.stringify(this.result.username))
      },
      methods:{
        requestProfileDetails()
        {
          window.open("http://localhost:8080/login","_self")
        }
      }
    };
  </script>
  <style lang="scss" scoped>
    nav {
      margin-top: 25px;
      margin-bottom: 30px;
      a {
        font-weight: bold;
        color: #2c3e50;
        &.router-link-exact-active {
          color: #d88d00;
        }
      }
    }

  </style>