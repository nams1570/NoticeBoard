<template>
  <div class="home">
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Welcome to your NoticeBoard</h1>
          <h2 class="subtitle">
            Make sure you check out our upcoming events below
          </h2>
          <div class="button-block">
              <router-link :to="'/addNotice'">
                <button class="button is-xl is-dark">
                  Submit a new Notice!
                </button>
              </router-link>
          </div>
        </div>
      </div>
    </section>
    <EventsList />
      
  </div>
</template>
<script>
import EventsList from '../components/EventsList.vue';
  export default {
    name: 'home',
    components: {EventsList},
    
  };
</script>
<style lang="scss" scoped>
  .hero {
    text-align: center;
    background-image: url('https://cdn.auth0.com/blog/vue-meetup/event-banner.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 400px;
  }
  .board
  {
    background-image: url('../assets/corkboard.jpg');
    background-position: center;
    background-size:cover;
    position:fixed;
    background-repeat: no-repeat;
    height: 500px;
    top:40%;
    width:50%;
    right: 20%;
    border: 1px solid green;
    z-index: 1;
  }
  .notice
  {
    background-image: url('../assets/NotePic(CAman).png');
    background-size: cover;
    background-position:center;
    background-repeat: no-repeat;
    border: 1px solid red;
    left: 20%;
    top: 5%;
    width: 20%;
    height: 150px;
    position:absolute;
    z-index: 2;
  }
  .hero-body .title {
    text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.6);
    padding: 40px 0 20px 0;
    font-size: 60px;
  }
  .subtitle {
    text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.7);
    font-size: 30px;
  }
  .button-block {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    position: absolute;
    bottom: -150px;
    .button {
      margin-right: 50px;
      padding-left: 50px;
      padding-right: 50px;
    }
    .welcome {
      width: 400px;
      padding: 10px;
      margin-left: auto;
      margin-right: auto;
    }
  }
  .is-xl {
    font-size: 1.7rem;
  }
</style>
