<template>
    <div class="main_section">
        <div class="quantity_section" v-if="hasSelectedProduct">
            <div class="quantity">
                <div class="container_qty">
                    <button class="addbtn" @click="AddProduct">Add</button>
                    <button class="cancelbtn" @click="hasSelectedProduct=false">Cancel</button> 
                    <input type="number" placeholder="Enter Quantity .." v-model="orderItem.qty" > 
                    <div class="details">
                        <h3> Name : {{orderItem.name}} </h3>
                        <h3> Code : {{orderItem.code}}</h3>
                        <h3> Price : {{orderItem.price}}</h3>
                        <h3> Qty : {{setFormatTotal(orderItem.qty)}}</h3> 
                        <h3>Total : {{setFormatTotal(orderItem.qty * orderItem.price)}}</h3>
                    </div>
                </div>
            </div>
        </div>
        <div class="lookup_section" v-if="selectLookup">
            <div class="lookup">
                <div class="container_lookup">
                    <div class="filtersContainer">
                        <h1>List</h1>
                        <div class="functions">
                            <select  v-model = "isCategorySelected" >
                                <option  v-for="categories in category" :key = categories.id :value="categories.id">{{categories.name}}</option> 
                            </select>
                            <input type="text" name="" id="" placeholder="Search ..." v-model = "search">
                            <span>|</span>
                            <button @click="selectLookup = false">Done</button>
                        </div>
                    </div>
                    <table id="products">
                        <tr>
                            <th>Product</th>
                            <th>Price</th> 
                        </tr>
                        <tr v-for="(item,i) in filterlookup " :key="i">
                            <td>{{item.name}}</td>
                            <td>P{{item.price}}</td> 
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="productslist">
            <div class="items" v-for="(item,i) in filterData " :key="i" @click="hasSelectProduct(item)" style="background-image:url(../assets/Product.jpg)"> 
                
                <div class="name">
                    {{item.name}}<h3>P{{item.price}}</h3> 
                </div>
            </div> 
        </div>  
    </div>
</template>
<script>
import {bus,Format} from "../main.js";
 import axios from 'axios';
export default {
    data(){
       return{
           search:'',
           selectedCategory_id:1,
           hasSelectedProduct:false,
           selectLookup:false,

           orderItem:{   
                        id:'',
                        code:'',
                        name:'',
                        price:'',
                        qty:1 },
           orderlist:[],
           items:[]  
       }
    },
    methods:{
        hasSelectProduct(item){
            const newItemArray = {
                id:'',
                code:'',
                name:'',
                price:'',
                qty:1
            }
            this.hasSelectedProduct = true 
            newItemArray.id = item.id 
            newItemArray.code = item.code  
            newItemArray.name = item.name
            newItemArray.price = item.price 
            newItemArray.id = item.id 
            this.orderItem = newItemArray 
        },
        AddProduct(){ 
            this.hasSelectedProduct = false
            let var_orderItem = {}
            var_orderItem = this.orderItem
            this.orderlist.unshift(var_orderItem);
            bus.$emit("Orders", this.orderlist);  
        },
         setFormatTotal(total){  
            return Format(total)
        }, 
        cleaner(){ 
            this.orderItem.name = ""
            this.orderItem.price = "" 
            this.orderItem.qty = 1  
        } ,  
    }, 
     mounted(){
        axios.get("https://serene-coast-99294.herokuapp.com/api/product/show")
        .then(res =>{
            this.items = res.data.data;  
        }); 
        bus.$on("Category", data =>{ 
            this.selectedCategory_id = data 
        });
        bus.$on("isLookupContainer", data =>{
            this.selectLookup = data 
        }); 
         axios.get("https://serene-coast-99294.herokuapp.com/api/category/show")
        .then(res =>{
              this.category = res.data 
              this.isCategorySelected = '' 
        }); 
    },
    computed:{ 
        filterlookup:function(){  
            let category 
             
            category =  this.items.filter(item => {  
                if (this.isCategorySelected) {  
                    return item.category_id === this.isCategorySelected;   
                }  
                return item.category_id           
            }); 
            if(this.items && this.items.length > 0){
                return  category.filter(item => {   
                    return item.name.toLowerCase().match(this.search.toLowerCase()); 
                });    
            } 
            return category;                           
        },
         filterData:function(){ 
            return this.items.filter(item => {  
                 return item.category_id === this.selectedCategory_id;     
            });                          
        },
    }
}
</script>

<style scoped>
*{
    margin:0px;
    padding:0px; 
}
.main_section{
    height: 90vh; 
    overflow: auto; 
}
 
/* background-color:red; */
.main_section .productslist {
    display:flex;
    flex-wrap: wrap; 
}
.main_section .productslist .items{
    width:150px;
    padding:10px;
    border:1px solid #ddd;
    border-radius: 20px;
    color:white;
    overflow:hidden;
    margin:3px;
    cursor:pointer;
    display:flex;
    justify-content: center;
    align-items:center;
    background-color:#4CAF50;
}
.main_section .productslist .items:hover{
    opacity:.3;
}
.main_section .productslist .items img{
    max-width: 80px;
    max-height: 50px; 
}
 



/* QUANTITY */
.quantity_section{
    position:fixed; 
    top:0;
    left:0;
    right:0;
    bottom:0; 
}
.quantity_section .quantity{ 
    position:relative; 
    height: 100vh;
    display:flex;
    justify-content:center;
    align-items:center;
}
.quantity_section .quantity .container_qty{
    background-color:#4A4A4A; 
    color:#fff;
    padding:20px;
    opacity:2;  
}
.quantity_section .quantity .container_qty .details{
    line-height: 1.5;
}

.quantity_section .quantity .container_qty input{
    font-size:30px;
    padding:10px;
    text-align:right; 
}
.quantity_section .quantity .container_qty button{
    font-size:30px;
    padding:10px; 
    text-align:right;  
    cursor:pointer;
}
.addbtn{
    background-color:#4CAF50;
    color:white; 
}
.cancelbtn {
     background-color: #f44336;
    color:white;
    font-size:15px;
    padding:5px;
    margin:0 5px; 
} 

/* LOOKUP ITEMS */
.lookup_section{
    position:fixed; 
    top:0;
    left:0;
    right:0;
    bottom:0; 
}
.lookup_section .lookup{ 
    position:relative; 
    height: 100vh;
    display:flex;
    justify-content:center;
    align-items:center;
}
.lookup_section .lookup .container_lookup{
    background-color:white; 
    opacity:2;  
    height: 70%;
    width:90%;
    padding:10px;
    border:3px solid black;
    border-radius: 10px;
}

.lookup_section .lookup .container_lookup #products {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

.lookup_section .lookup .container_lookup #products td, #products th {
  border: 1px solid #ddd;
  padding: 8px;
}

.lookup_section .lookup .container_lookup #products tr:nth-child(even){background-color: #f2f2f2;}

.lookup_section .lookup .container_lookup #products tr:hover {background-color: #ddd;}

.lookup_section .lookup .container_lookup #products th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4CAF50;
  color: white;
}

.lookup_section .lookup .container_lookup .filtersContainer{
        display:flex;
        justify-content: space-around;
        align-items: center;
    }
.lookup_section .lookup .container_lookup .filtersContainer .functions{
        display:flex;
        justify-content: space-around;
        width:40%;
        height: 30px;
    }
.lookup_section .lookup .container_lookup .filtersContainer .functions input{
        border:1px solid black;
        border-radius: 5px;
        width:50%;
        font-size: 20px;
        padding:10px;
    }
.lookup_section .lookup .container_lookup .filtersContainer .functions span{
         font-size: 32px;
         margin:0px; 
         height: 100%;
    }
.lookup_section .lookup .container_lookup .filtersContainer .functions button{
         font-size:20px;
         width:30%;
         height: 100%;
         background-color:#4CAF50;
         color:white;
         cursor:pointer;
    }
</style>