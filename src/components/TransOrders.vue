<template>
    <div class="main_section">
        <div class="transdetails">
            <div class="transInfo">
                <h3>Transaction No. : </h3>
                <h2>{{transno}}</h2>
            </div>  
            <div class="transInfo">
                <h3>Total : </h3>
                <h1>{{getTotal()}}</h1>
            </div>
        </div>
        <div class="orderslist">
            <div class="order-items" v-for=" (order,index)  in orders" :key="order.id">
                 <div class="order_details">
                    <p>Product : {{order.name}}</p>
                    <p>Price : {{setFormatTotal(order.price)}}</p>
                    <p>Qty : {{setFormatTotal(order.qty)}}</p>
                    <p>Total : {{setFormatTotal(order.qty * order.price)}}</p>  
                 </div>
                 <div class="func"> 
                     <button class="void" @click = "VoidProduct(index)">
                         <i class="fa fa-close" aria-hidden="true"  style="font-size:30px;" ></i>
                     </button>
                 </div>
            </div>
        </div> 
    </div>
</template>
<script>
import {bus,Format} from "../main.js"
export default{
    data(){
        return{ 
            transno:"",
            totalAmount:0,
            orders:[],
            orderItems:{
                id:'',
                name:'',
                qty:'',
                price:''
            }, 
        }
    },
    methods:{ 
        generateTransno(){
            return this.transno = Date.now() 
        },
        VoidProduct(index){ 
            if (index === 0 ) {
                this.orders.pop(); 
            }else{
                this.orders.splice(index,index)
            }   
        },
        getTotal(){   
            this.$emit("sendforComputation",this.orders)  
            let totalAmount = this.orders.reduce((total,data)=>{
                return (data.price * data.qty) + total
            },0)  
             this.totalAmount = Format(totalAmount);  
                bus.$emit("validateTotal",totalAmount); 
                return this.totalAmount  
        }, 
         setFormatTotal(total){  
            return Format(total)
        }, 
    },
     
    mounted(){ 
         bus.$on("Orders",data =>{
            let newArray = []
            newArray = data;
            this.orders = newArray 
        }) 
        this.generateTransno(); 
        this.$emit("SetTransNo",this.transno)  
         bus.$on("clearData", data =>{
             if(data === true){
                 this.orders = []
                 this.generateTransno()
             }
         }); 
    }
}
</script>
<style  scoped>
*{
    margin:0;
    padding:0;
    list-style: none;
}
.main_section{
    height :89vh;
    margin:10px;
    overflow:auto; 
    border:1px solid #707070;
    border-radius: 20px;
}
.main_section .orderslist{
    background-color:#fff;
    margin:10px;
    border:1px solid rgb(250, 243, 243);
    border-radius:10px;
    height: 70%;
    overflow:auto;
}
.main_section .orderslist .order-items{ 
    border:1px solid #707070;
    border-radius: 10px;
    background-color:#5f5f5f;
    color:#fff; 
    display:grid;
    grid-template-columns:1fr; 
    justify-content: space-between; 
    align-items:center;
    width:100%;
    padding:10px 10px;
    line-height: 1.3;
    position: static;

}
.main_section .orderslist .func{
    display:flex;
    justify-content:space-evenly;
    align-items: center; 
}
.main_section .orderslist .func button{ 
    cursor:pointer;
    background-color:red;
}
.main_section .orderslist .func .edit:hover{
    background-color:green;
    color:white;
}
.main_section .orderslist .func .void:hover{ 
    color:white;
} 
.main_section .transdetails{ 
    color:limegreen;
    margin:10px; 
    border-radius:10px;
    height: 20%;
    overflow:auto;
    display:flex;
    flex-direction:column;
    justify-content:space-around
}
.main_section .transdetails .transInfo{
    display:flex;
    justify-content: space-between; 
    padding:8px;
}
.main_section .transdetails .transInfo h3{
    color:#5f5f5f; 
}
.main_section .transdetails .transInfo h3 span{
    color:limegreen;
}
 
</style>