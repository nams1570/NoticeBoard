<template>
    <div class="event-single">
      <section class="hero is-primary">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">{{ this.$data.notice.noticeName }}</h1>
            <h2 class="subtitle ">{{ this.$data.notice.dueDate }}</h2>
          </div>
        </div>
      </section>
      <section class="event-content">
        <div class="container">
          <h2>Notice Description:</h2><br>
          <button @click ="editDesc = !editDesc">Edit?</button>
          <p v-if="editDesc" class="is-size-4 description">{{ this.$data.notice.description }}</p>
          <div v-else class = "enter-description"> 
            <input :value = "description" @input="onInputDesc" placeholder ="text here!">
          </div><br>
          <div class="event-images columns is-multiline has-text-centered">
          </div>
        </div>
      </section>
    </div>
  </template>
  <script>
    import NoticeService from '@/services/NoticeService';

    export default {
        name:'NoticeSingle',
        data(){
            return{
                notice:{},
                editDesc:true
            }
        },
        created(){
            this.getNoticeData();
        },
        methods:{
            async getNoticeData(){
              console.log('this route is'+this.$route.fullPath);
              var vm = this;
                NoticeService.getNotice(this.$route.params.nname).then((notice) => {
                console.log('notice data'+notice)
                  vm.notice = notice;
            })
            console.log('notice is'+ JSON.stringify(vm.notice));
                

            },
            async onInputDesc(e) {
            this.notice.description = e.target.value
            await NoticeService.updateDesc(this.notice)
    }
        }
    };
  </script>
  <style lang="scss" scoped>
    .event-single {
      margin-top: 30px;
    }
    .hero {
      margin-bottom: 70px;
    }
    .event-images {
      margin-top: 50px;
    }
    .description {
      margin-bottom: 30px;
    }
  </style>