<template>
    <div :class="NavToogle()"> 
        <div class="content"> 
            <ul :class="showClass">  
                <li v-on:click="page('CompanyContainer')">Company</li>
                <li v-on:click="page('UsersContainer')">Users</li>
                <li v-on:click="page('ProductsList')">Products </li>
                <li v-on:click="page('Categorylists')">Category</li>  
                <li v-on:click="page('ReportContainer')">History</li>
            </ul>
        </div>
    </div>
</template>
<script>
import {bus} from '../main.js'
export default {
    data(){
        return{
            show:true,
            showClass:'function_section' 
            
        }
    },
    methods:{
        page:function(param){ 
            this.$emit('update_page', param); 
        },
        NavToogle(){ 
            if (this.show === true) {
                return this.showClass = "function_section" 
              }else{
                return this.showClass = "function_section function_section_toggle"
            }
        }
    },
    mounted(){
        bus.$on("toogle", data => {
              this.show = data
              if (this.show === true) {
                  return this.showClass = "show"
              }else{
                  return this.showClass = ""
              }
        });
    }
    
}
</script>
<style scoped>
     *{
        box-sizing:border-box;
        padding:0px;
        margin:0px;
        
    }
    ul{
        list-style:none;
    }
    a{
        text-decoration:none;
        color:#707070; 
        
    }
    :root{
        --primary :#4A4A4A;
        --secondary :#707070;
    } 
    .function_section{ 
        width:0%;
        font-family: Verdana,sans-serif;
        font-size: 20px;
        line-height: 1.5;  
        transition: width 2s;
    } 
    .function_section_toggle{ 
        width:0;   
    } 
    .function_section .content{
        color:#000;   
        height: 100vh;  
    }
    .function_section .content ul{
        display:grid; 
        grid-template-rows:1fr;
        align-content: center;  
    }
    .function_section .content ul li,.function_section .content ul li{
        display:flex;
        justify-content:center;
        align-items: center; 
        padding:20px 50px 0 50px; 
        cursor:pointer; 
        border-bottom:1px solid #fefefe
        
    }
    .function_section .content ul li:hover , .function_section .content ul li a:hover {
         background-color:#4CAF50;
         color:white; 
    }
     
</style>