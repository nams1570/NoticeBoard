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
          <router-link to="/login" class = "navbar-item">Login</router-link>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div  v-if="isLoggedIn !== true" class="buttons">
              <a v-on:click="requestProfileDetails" class="button is-dark">
                <strong>Sign In</strong>
              </a>
            </div>
            <div class = "profile-display" v-else> 
              <img :src="result?.picture"><br>
              <strong> {{ result?.name }} </strong>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </template>
  <script>
  import AuthService from "../../services/AuthService"
    export default {
      name: 'Nav',
      data(){
        return{
          result:'',
          isLoggedIn: false
        }
      },
      created:async function(){
        await this.getProfileDetails()
        console.log("Login det"+JSON.stringify(this.result));
      },
      methods:{
        async requestProfileDetails()
        {
          window.open("http://localhost:8081/auth")
          
        },
        async getProfileDetails()
        {
          this.result = await AuthService.getProfileData()
          console.log("our pre is "+JSON.stringify(this.result))
          if(JSON.stringify(this.result) != "{}")
          {
            console.log("Hoi")
            this.isLoggedIn = true;
          }
          else
          {
            console.log("hei")
            this.isLoggedIn = false;
          }
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