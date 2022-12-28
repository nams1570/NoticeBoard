<script>
export default {
    mounted()//here can have elements of DOM "mounted" so accessible by rest of program
    {//called lifecycle hook, can register callbacks to be called at certain times in elements lifecycle

    },
    data(){// declare private states/ data variables
        return {
            awesome: true,
            text: "Hello"
        }
    },
    watch:{ //define funcs here with same name as data elements above. When they change values, these funcs execute sort of like event listeners

    },
    methods: {
        toggle()
        {
            this.awesome = !this.awesome
        }
    },
    computed:{ //declare reactive states i.e states that update or are created based on changes in other states

    }
}
</script>
<template>

</template>
<style> 
</style>