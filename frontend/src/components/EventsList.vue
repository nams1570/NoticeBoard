<template>
    <div class="events container">
      <h2 class="subtitle is-3">Check out all upcoming notices</h2>
      <div class="columns is-multiline">
        <div 
            v-for="notice in notices"
            :notice = "notice"
            :key = "notice.noticeName"
            class="column is-one-quarter">
            {{ notice.noticeName }}
            {{ notice.dueClass }}
            <button class = "delete-button" @click.once="deleteNotice(notice.noticeName)"></button>
          <router-link :to="'/notices/' + notice.noticeName">
            <EventCard :notice="notice"/>
            </router-link>
        </div>
      </div>
      <h2 class="subtitle is-3">Notices due Today:</h2>
      <div class="columns is-multiline">
        <div 
            v-for="notice in todayNotices"
            :notice = "notice"
            :key = "notice.noticeName"
            class="column is-one-quarter">
            {{ notice.noticeName }}
            {{ notice.dueClass }}
            <button class = "delete-button" @click.once="deleteNotice(notice.noticeName)"></button>
          <router-link :to="'/notices/' + notice.noticeName">
            <EventCard :notice="notice"/>
            </router-link>
        </div>
      </div>
      <h2 class="subtitle is-3">Notices due next week:</h2>
      <div class="columns is-multiline">
        <div 
            v-for="notice in nextWeekNotices"
            :notice = "notice"
            :key = "notice.noticeName"
            class="column is-one-quarter">
            {{ notice.noticeName }}
            {{ notice.dueClass }}
            <button class = "delete-button" @click.once="deleteNotice(notice.noticeName)"></button>
          <router-link :to="'/notices/' + notice.noticeName">
            <EventCard :notice="notice"/>
            </router-link>
        </div>
      </div>
      <h2 class="subtitle is-3">Notices due next month:</h2>
      <div class="columns is-multiline">
        <div 
            v-for="notice in nextMonthNotices"
            :notice = "notice"
            :key = "notice.noticeName"
            class="column is-one-quarter">
            {{ notice.noticeName }}
            {{ notice.dueClass }}
            <button class = "delete-button" @click.once="deleteNotice(notice.noticeName)"></button>
          <router-link :to="'/notices/' + notice.noticeName">
            <EventCard :notice="notice"/>
            </router-link>
        </div>
      </div>
      <h2 class="subtitle is-3">Notices due beyond that period:</h2>
      <div class="columns is-multiline">
        <div 
            v-for="notice in beyondNotices"
            :notice = "notice"
            :key = "notice.noticeName"
            class="column is-one-quarter">
            {{ notice.noticeName }}
            {{ notice.dueClass }}
            <button class = "delete-button" @click.once="deleteNotice(notice.noticeName)"></button>
          <router-link :to="'/notices/' + notice.noticeName">
            <EventCard :notice="notice"/>
            </router-link>
        </div>
      </div>
      <h2 class="subtitle is-3">Notices that have already passed:</h2>
      <div class="columns is-multiline">
        <div 
            v-for="notice in backlogNotices"
            :notice = "notice"
            :key = "notice.noticeName"
            class="column is-one-quarter">
            {{ notice.noticeName }}
            {{ notice.dueClass }}
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
        //put request
        this.updateAllDueClass();
        this.getNoticeData();
      },
      computed:{
        backlogNotices()
        {
          return this.notices.filter(notice=>notice.dueClass === "Backlog");
        },
        todayNotices()
        {
          return this.notices.filter(notice=>notice.dueClass === "Today");
        },
        nextWeekNotices()
        {
          return this.notices.filter(notice=>notice.dueClass === "Coming Week");
        },
        nextMonthNotices()
        {
          return this.notices.filter(notice=>notice.dueClass === "Coming Month");
        },
        beyondNotices()
        {
          return this.notices.filter(notice=>notice.dueClass === "Beyond");
        },
      },
      methods:{
        updateAllDueClass()
        {
          for(var notice in this.notices)
          {
            console.log("Notice is"+{notice})
            NoticeService.updateDueClass(notice);
          }
        },
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
      cursor:pointer;
    }
    
  </style>