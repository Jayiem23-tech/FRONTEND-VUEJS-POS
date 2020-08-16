<template>
    <div :class="GetContainerClass()"> 
        <!-- FOR PAYMENT CONTAINER -->
        <div class="isPaymentStyle" v-if="isPayment">
            <div class='main' >
                <TransPayment :transNo = "transactioNo" :orders = "forPaymentComputation" v-on:isPaymentContainer = "hasPayment($event)"/> 
            </div> 
        </div> 
        
        <!-- FOR TRANSACTION CONTAINER -->
        <div class="container"  v-else>
             <TransFunctions v-on:isPaymentContainer = "hasPayment($event)" /> 
            <div class='left'>
                <TransCategory />
            </div> 
            <div class='main'>
                <TransProducts /> 
            </div>  
        </div>
        
        <div class='right'>
            <TransOrders v-on:sendforComputation = "getTotalsForComputation($event)" v-on:SetTransNo = "getTransactionNo($event)" />
        </div> 
        <h1>Not available in Mobile / Tablet size </h1> 
    </div>
</template>
<script>
import TransCategory from './components/TransCategory.vue'
import TransFunctions from './components/TransFunctions.vue'
import TransOrders from './components/TransOrders.vue'
import TransProducts from './components/TransProducts.vue'
import TransPayment from './components/TransPayment.vue' 
// import {bus} from "./main.js"
  
export default {
    components:{
        TransCategory,
        TransFunctions,
        TransOrders,
        TransProducts,
        TransPayment
    },
    data(){
        return{
            isPayment:false,
            transactioNo:'',
            forPaymentComputation:[],
            subTotal:0, 
        }
    },
    methods:{
        GetContainerClass(){
            if (this.isPayment === false) {
                return this.isAdmin = "admin_section_trans";
            }else{  
                 return this.isAdmin = "admin_section_payment";
            }
        },
        hasPayment(data){ 
            let totalAmount = this.forPaymentComputation.reduce((total,data)=>{
                return (data.price * data.qty) + total
            },0)  

            if (totalAmount > 0) {
                return this.isPayment = data; 
            }else{
                alert("Order Items is Empty");
            }  
        },
        getTotalsForComputation(data){ 
            this.forPaymentComputation = data
        },
        getTransactionNo(data){
            this.transactioNo = data
        }
    },
   
}
</script>
<style scoped>
     
    .admin_section_trans{ 
        display:grid;
        grid-template-columns: auto 30%;
        background-color:#fff;
     }
    .admin_section_trans .container{ 
        display:grid;
        grid-template-columns: 15% auto;
        height: 100vh;
        width: 100%;  
        background-color:#fff;
    }

    
    .admin_section_payment{
         display:grid;
        grid-template-columns: auto 40%;
        background-color:#1b262C;

    }

    .admin_section_payment .isPaymentStyle{ 
        display:grid;
        grid-template-columns:  1fr  ;
        height: 100vh;
        width: 100%; 

        background-color:#1b262C;
    }
    .admin_section_trans .left {
        background-color:#fff;
        border-right:1px solid #4A4A4A;
        padding: 0 10px;
    }
    h1{
        display:none;
    }
     @media (max-width:1000px) {
         .admin_section_payment  .isPaymentStyle ,.admin_section_trans .left , .admin_section_trans .container , .right{
             display:none;
         }
        h1{
            display:block;
        }
     }

</style>