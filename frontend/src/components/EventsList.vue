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
      created:async function(){
        //put request
        await this.getNoticeData();
        await this.updateAllDueClass();
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
        async updateAllDueClass()
        {
          try
          {
            this.notices.forEach(notice=>
            {
              NoticeService.updateDueClass(notice);
            })
          }
          catch(err) 
          {
            console.log(err)
            throw(err)
          }
        },
        deleteNotice(noticeName){
          NoticeService.delNotice(noticeName).then();
        },
        async getNoticeData(){
            var vm = this;
            this.notices= await NoticeService.getAllNotices()
          
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
      opacity:1
    }
    .delete-button:hover{
      opacity:0.5
    }
  </style>