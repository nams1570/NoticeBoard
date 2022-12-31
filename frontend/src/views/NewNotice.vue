<template>
    <div class = "new-notice">
        <div class = "enter-notice-name"> 
            Enter the notice name! <br>
            <input :value = "noticeName" @input="onInputNoticeName" placeholder ="text here!">
        </div><br>
        <div class = "enter-due-date"> 
            Enter the due date! <br>
            <input type="date" :value = "dueDate" @input="onInputDueDate" placeholder ="text here!">
        </div><br>
        <div class = "enter-priority"> 
            Enter the priority! <br>
            <input :value = "Priority" @input="onInputPriority" placeholder ="text here!">
        </div><br>
        <div class = "enter-description"> 
            Enter a short description <br>
            <input :value = "description" @input="onInputDesc" placeholder ="text here!">
        </div><br>
        <router-link :to="'/'">
        <button @click="addNotice">
            Submit a notice here!
        </button>
        </router-link>
    </div>
</template>
<script>
import NoticeService from '@/services/NoticeService';
export default{
    data(){
        return{
            noticeName: '',
            dueDate: '',
            Priority:'',
            description:''
        }
    },
    methods:{
        onInputNoticeName(e) {
      this.noticeName = e.target.value
    },
    onInputDueDate(e) {
      this.dueDate = e.target.value
    },
    onInputPriority(e) {
      this.Priority = e.target.value
    },
    onInputDesc(e) {
      this.description = e.target.value
    },
      addNotice(){
        NoticeService.postNotice({noticeName:this.noticeName,
            dueDate:this.dueDate,
        priority:this.Priority,description:this.description}).then();
      }
    }
}
</script>