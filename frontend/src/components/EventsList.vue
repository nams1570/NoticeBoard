<template>
    <div class="events container">
      <h2 class="subtitle is-3">Check out our upcoming events</h2>
      <div class="columns is-multiline">
        <div 
            v-for="notice in notices"
            :notice = "notice"
            :key = "notice.noticeName"
            class="column is-one-quarter">
            {{ notice.noticeName }}
            <button class = "delete-button" @click.once="deleteNotice(notice.noticeName)"></button>
          <router-link :to="'/notices/' + notice.noticeName">
            <EventCard :notice="notice"/>
            </router-link>
        </div>
      </div>
    </div>
  </template>
  <script>
    import EventCard from '@/components/EventCard';
    import NoticeService from '@/services/NoticeService';
    export default {
      name: 'EventsList',
      data(){
        return{
            notice:{},
            notices:[]
        }
      },
      created(){
        this.getNoticeData();
      },
      methods:{
        deleteNotice(noticeName){
          NoticeService.delNotice(noticeName).then();
        },
        async getNoticeData(){
            var vm = this;
            NoticeService.getAllNotices().then((response)=>{
                console.log(response);
                response.forEach(element=>{
                    console.log(element)
                    vm.notices.push(element)
                })
            })
            console.log('notices is now'+ JSON.stringify(vm.notices));
        }
      },
      components: {
        EventCard,
      },
    };
  </script>
  <style lang="scss" scoped>
    .events {
      margin-top: 100px;
      text-align: center;
    }
    .delete-button{
      height:20px;
      width:20px;
      background: url("../assets/deleteImage.png");
      background-position: center;
      background-size: cover;
    }
    
  </style>