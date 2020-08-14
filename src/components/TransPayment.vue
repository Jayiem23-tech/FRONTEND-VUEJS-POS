<template>
    <div class="payment_section"> 
        <div class="Change_section" v-if="showChange">
            <div class="Change">
                <div class="container_Change">
                     <label for="">Change : {{data.change}}</label> 
                     <button class="btndone" @click="isPayments(false)">Done</button>
                </div>  
            </div>
        </div>
        <div class="container_main"> 
            <div class="container">
                <label for="">Total Items</label> 
                 <label for="" class="number">{{getTotalItems()}}</label>  
            </div>
            <div class="container">
                <label for="">Amount</label> 
                 <label for="" class="number">{{getTotalPrices()}}</label>  
            </div>
            <div class="container">
                <label for="">Vatable Sales</label> 
                <label for="" class="number">{{data.vatableSales}}</label>  
            </div>
            <div class="container">
                <label for="">Vat</label> 
                <label for="" class="number">{{data.vat}}</label>  
            </div>
            <div class="container">
                <label for="">Subtotal</label> 
                <label for="" class="number">{{data.totalPrice}}</label>  
            </div>
            
            <div class="container">
                <label for="">Cash Tendered</label> 
                <input type="number" class="number tender" placeholder="0.00" v-model="data.cashTendered" @keyup="getChange"> 
            </div>
            <div class="container">
                <label for="" >Change</label> 
                <label for="" class="number">{{data.change}}</label>  
            </div> 
            <div class="container">
                <button class="btncancel" @click="isPayments(false)">Cancel</button> 
                <button class="btnsave" @click="saveTransaction()">Save</button> 
            </div> 
           
        </div>
       
    </div>
</template>
<script>
import axios from 'axios'
import {bus,Format} from "../main.js";


export default {
    props:{
        orders:{
            type:Array
        },
        transNo:{
            type:String,
            required:true
        }
    },
    data(){
        return{  
            Orders_Array:[],
            showChange:false,
            totalClone:0,
            data:{
                totalPrice:'',
                totalItems:'',
                vatableSales:'',
                vat:'',
                subTotal:'',
                cashTendered:'',
                change:'',
                transNos:''
            } 
        }
    }, 
    methods:{ 
        saveTransaction(){ 
            if (this.data.cashTendered >= this.totalClone && this.totalClone > 0 ) {
                axios.post("https://serene-coast-99294.herokuapp.com/api/transaction/saveHeader",{
                transno:" "+this.transNo, 
                totalItems:this.data.totalItems ,
                totalAmount:this.data.totalPrice.replace(/,/g, ""),
                vatableSales:this.data.vatableSales.replace(/,/g, ""),
                vat:this.data.vat.replace(/,/g, ""),
                cashTendered:this.data.cashTendered.replace(/,/g, ""),
                change:this.data.change.replace(/,/g, ""),  
                }).then(res => {
                    // console.log("Response:: ",res.data); 
                    this.saveTransactionBody(res.data); 
                }).catch(error => {
                    console.log("ERRRR  header:: ",error.response.data);
                })
            }else{
                alert("Invalid Cash Tendered!!! ");
            }
            
        }, 
        saveTransactionBody(id){ 
            this.orders.forEach(element => {
                axios.post("https://serene-coast-99294.herokuapp.com/api/transaction/saveBody",{ 
                    products_id:element.id,
                    price:element.price,
                    quantity:element.qty,
                    subtotal:element.price * element.qty,
                    trans_headers_id:id
                }).then(res => {
                    console.log("Response body:: ",res.data);
                    this.response_header_id = res.data;
                    this.showChange=true ;
                }).catch(error => {
                    console.log("ERRRR  body:: ",error.response.data);
                }) 
                console.log(element.price);
                // console.log(id); 
            }) 
        },
        getTotalPrices(){
            let totalPricesdata = this.orders.reduce((totalPrices,datas)=>{
                return (datas.price * datas.qty) + totalPrices
            },0) 
            this.totalClone = totalPricesdata
            this.data.totalPrice =  Format(totalPricesdata) 
            return this.data.totalPrice 
        },
        getTotalItems(){
            let totalItemdata = this.orders.reduce((totalItems,datas)=>{
                return datas.qty + totalItems
            },0) 
            this.data.totalItems = totalItemdata
            return Format(totalItemdata)
        }, 
        getChange(){ 
            this.data.transNos = this.transNo.toString()
            if (this.data.cashTendered >= this.totalClone) { 
                let cashTendered = this.data.cashTendered
                let change = cashTendered - this.totalClone 
                this.data.change = Format(change) 
            }else{
                this.data.change = 0
            } 
        },
        isPayments(data){ 
            bus.$emit("clearData", true);
            this.$emit("isPaymentContainer", data)  
            return this.Payment = data 
            
        }
        
    },  
    mounted(){ 
        if(this.totalClone > 0){
            let total =  this.totalClone; 
            let vat =  (total * .12)/1.12
            let vatableSales = total - vat  
            let subTotal = total
            
            this.data.vat = Format(vat)
            this.data.vatableSales = Format(vatableSales)
            this.data.subTotal = subTotal  
        }else{
            this.data.vat = 0
            this.data.vatableSales = 0
            this.data.subTotal = 0 
        }
         
    }
}
</script>


<style scoped>


.payment_section .container_main{ 
    color:white;
    font-size:30px;
}
.payment_section .container_main .container{
    padding:10px; 
    margin:3px 0;
    height: 90%;
    background-color:black; 
    display:flex;
    justify-content: space-between; 
}
.payment_section .container_main .container .number{
    text-align:right; 
    color:lime;
    width:50%;
}
.payment_section .container_main .container .tender{
    font-size:30px;
    padding:10px;
    color:black;
} 
/* CHANGE POPUP */
.payment_section .Change_section{
    position: fixed; 
    top:0;
    left:0;
    right:0;
    bottom:0;  
    
    
}
.payment_section .Change_section .Change{ 
    position: relative;
    height: 100vh;
    display:flex;
    justify-content:center;
    align-items:center; 
   
} 
.payment_section .Change_section .Change .container_Change{
    opacity: 10;
    color:lime;
    background-color:black;
    font-size: 3em;
    border:1px solid red;
    padding:20px;
    display:flex;
    flex-direction:column;
    justify-content: space-around;
    align-items:center;  
}
 
 /* button */
 .btncancel{
    padding:10px;
    font-size:1em;
    color:white;
    background-color: #f44336;
    cursor:pointer;
}
 .btnsave {
    padding:10px;
    font-size:1em;
    color:white;
    background-color:#4CAF50;
    cursor:pointer;
}
 .btndone{
    padding:4px;
    margin:5px 0;
    font-size:.5em;
    color:white;
    background-color:#4CAF50;
    cursor:pointer;
 }
 
</style>