<template>
  <div id="app">
    <Nav/>
    <router-view />
  </div>
</template>

<script>
  import Nav from './components/partials/Nav.vue';
  export default {
    name: 'app',
    /*mounted(){
      this.emitter.on("successful-login",(loginResult)=>{
          console.log("Ya did it!");
          console.log("Hi"+JSON.stringify(loginResult));
          this.isLoggedIn = true;
          sessionStorage.setItem("isLoggedIn",true)
          try 
          {
            this.resultOfLogin = loginResult;
            console.log("login suc")
          }
          catch{
            console.log("error in this.result");
          }
          sessionStorage.setItem("resultOfLogin",this.resultOfLogin)
        })
    },*/
    created(){
      console.log("Entered app")
      
    },
    components: {
      Nav,
    },
  };
</script>
<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
