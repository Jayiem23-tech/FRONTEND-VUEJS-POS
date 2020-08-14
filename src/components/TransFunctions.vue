<template>
     <div class="main_section">
        <div class="functionslist">
            <ul> 
                <li v-on:click = "isLookup(true)" class="button" >Lookup</li>
                <li><router-link to="/admin" class="button" >Settings</router-link></li>
                <li v-on:click = "isPayments(true)" class="button" > Payment</li>  
            </ul>
        </div>
    </div>
</template>
<script>
import {bus} from "../main.js";
export default {
    data(){
        return{
            Payment:false,
            lookup:false,
            subTotal:0  
        }
    },
    methods:{
        isPayments(data){ 
            this.$emit("isPaymentContainer", data) 
            return this.Payment = data  
        },
        isLookup(data){  
            bus.$emit("isLookupContainer", data) 
            return this.lookup = data 
        }, 
    }
}
</script>
<style scoped>
*{
    margin:0;
    padding:0;
    list-style: none;
}

.button{
    height: 100%;
    color:white;
    font-size:25px; 
    text-decoration: none;
    cursor:pointer;
}
.button:hover{ 
    color:#4CAF50;  
}
.main_section{
    position:absolute;
    bottom:0;
    left:0;
    right:0;
    height: 8vh;
}
.main_section .functionslist{
    background-color:#707070;
    height: 8vh; 
}
.main_section .functionslist ul{
    display:grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: center;
    align-content:center; 
}
.main_section .functionslist ul li{
    /* border-left:1px solid #12C229; */
    text-align:center;
    padding:10px;
    
}
.main_section .functionslist ul li:hover{
    /* background:#12C229; */
    cursor:pointer;
} 
</style>
