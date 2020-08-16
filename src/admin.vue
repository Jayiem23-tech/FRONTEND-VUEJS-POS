<template>
<div class="container">
     <div class="top"> 
        <h2>Simple Online Point of Sale System</h2> 
        <div class="gotoPos"> 
            <ul>
                <li><router-link to="/">Go to POS >></router-link></li>
            </ul>
        </div>
    </div> 
     
    <div class="admin_section"> 
        <div class='left'>
            <Adminfunc @update_page = "changePage"/>
        </div> 
        <div class='main'>
            <component v-bind:is="component" />  
        </div>  
        <h1>Not available in Mobile / Tablet size </h1>
    </div>
    
    <FooterContainer />
</div> 
</template>
<script>
import {bus} from './main.js'
import Adminfunc from './components/admin_func.vue'
import ProductsList from './components/ProductsList.vue'
import Categorylists from './components/Categorylists.vue'

import ReportContainer from './components/ReportContainer.vue' 
import FooterContainer from './components/FooterContainer.vue' 
import CompanyContainer from './components/CompanyContainer.vue' 
import UsersContainer from './components/UsersContainer.vue'  

export default {
    components:{
        Adminfunc,
        ProductsList,
        Categorylists,
        ReportContainer,
        FooterContainer,
        CompanyContainer,
        UsersContainer
    },
    data(){
        return{
            component:CompanyContainer,
            show:false
        }
    }
    ,methods:{
        changePage:function(data){
            this.component = data; 
        },
        burgerBarToogle(data){ 
            this.show = data;
            bus.$emit("toogle",data); 
        }
    }  
   
}
</script>
<style scoped>
     *{
         box-sizing: border-box;
         list-style: none; 
         text-decoration: none;
     }
    .admin_section{  
        height: 100vh;
        display: grid;
        grid-template-columns: 14vw 85vw;
    }
    .admin_section .left {
        background-color:#f1f1f1;  
        left:0;
        top:0;
        bottom:0;
        height: 100vh; 
    }
    .admin_section .main{
        background-color:#fff;  
        flex-grow: 10;
    }

    .container .top{
        height: 7vh; 
        background-color:#5f5f5f;
        color:#fff;
        display:flex;
        align-items: center;
        justify-content: space-around;
    }
    .container .top .gotoPos{ 
        background-color:#fff;  
        padding:5px 10px; 
    } 
    .admin_section h1{
        display:none;
    }
    
    @media (max-width:910px) {
        .admin_section{  
            height: 100vh;
            display: grid;
            grid-template-columns: 100vw;
            align-items: center; 
        }
        .admin_section .main , .admin_section .left{  
           display:none;
        } 
        .admin_section h1{
            display:grid;
        }
    }
</style>