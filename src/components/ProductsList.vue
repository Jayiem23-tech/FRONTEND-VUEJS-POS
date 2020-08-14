<template>
    <div class="productlist_section"> 
        <div class="popup" v-if="isRegister">
            <div class="register">
                <h2>Product Registration</h2>
                <form name="myform" @submit.prevent = "save()" >
                    <vue-progress-bar></vue-progress-bar>
                    <input type="text"  name="Code" id="code" placeholder="Code" v-model="code">
                    <input type="text"  name="Name" id="name" placeholder="Name" v-model="name">
                    <input type="number"  name="Price" id="price" placeholder="Price" v-model="price">  
                    <select  v-model = "isCategorySelected" >
                        <option  v-for="categories in category" :key = categories.id :value="categories.id">{{categories.name}}</option> 
                    </select> 
                    <p  v-if = "isUpdate">{{picture}}</p> 
                    <div class="buttons"> 
                        <button class="save" @click.prevent = "save">Save</button> 
                        <button @click = "RegisterCancel" class="cancel">Cancel</button> 
                    </div>
                    <h3 v-if="isErrorMessage" style="color:red;">{{errors}}</h3>
                </form>
            </div>
        </div> 
        <div class="productlist"> 
            <div class="filtersContainer">
                
                <h1>Products list </h1>
                <div class="functions">
                    <select  v-model = "isCategorySelected" >
                        <option  v-for="categories in category" :key = categories.id :value="categories.id">{{categories.name}}</option> 
                    </select>
                    <input type="text" name="" id="" placeholder="Search ..." v-model = "search">
                    <span>|</span>
                    <button v-on:click = "Register" >Add</button>
                </div>
            </div>
            <table id="list">
                <tr>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Actions</th> 
                </tr>
                <tr v-for="(products) in filterData " :key=products.id>
                    <td>{{products.name}}</td>
                    <td>{{products.code}}</td> 
                    <td>{{products.price}}</td> 
                    <td>{{products.category}}</td>
                    <td>
                        <button class = "editbtn" @click = "edit(products.id)" >Edit</button>
                        <button class = "removebtn" @click = "remove(products.id)">Remove</button>
                    </td>   
                </tr>
            </table> 
        </div> 
    </div>
</template>
<script>
 import axios from 'axios';
 import {bus} from '../main.js'
export default { 
    data(){
        return{
            BarToogle:false,
            isRegister: false,  
            search:'',
            isUpdate:false,
            isErrorMessage:false,           
            errors:'',
// SELECTED CATEGORY
            isCategorySelected: '',
// for fetch products list
            product:[],
            category:[], 
// Save Delete Data
            id:'',
            code:'',
            name:'',
            price:'',
            picture:'', 
            categories_id:'',
            picture_originalName:''  
        }
    },
    methods:{
        Register(){
             this.isRegister = true;
             this.isUpdate = false;
             this.id ="";
             this.cleaner();
             this.isErrorMessage = false;
        },
        RegisterCancel(){
             this.isRegister = false 
        }, 
        save(){  
            axios.post("https://serene-coast-99294.herokuapp.com/api/product/save", {
                id:this.id, 
                code:this.code,
                name:this.name,
                price:this.price,
                categories_id:this.isCategorySelected
            }).then((response)=>{
                this.loadData();  
                console.log(response);
                this.isRegister = false;
                this.cleaner();
               
            });
        },
        edit(id){
            for (let index = 0; index < this.product.length; index++) {
                if (id == this.product[index].id) {
                    this.id=this.product[index].id;
                    this.code=this.product[index].code;
                    this.name=this.product[index].name;
                    this.price=this.product[index].price; 
                    this.isCategorySelected=this.product[index].category_id; 
                    this.isRegister = true ;
                    this.isErrorMessage = false;
                } 
            }
            this.isUpdate = true;
        },
        remove(id){
            if (confirm('Are you sure you want to remove this thing into the database?')) {
                axios.post("https://serene-coast-99294.herokuapp.com/api/product/delete",{id:id}).then((response) =>{
                    this.loadData();  
                    this.search = "_";
                    this.search = "";
                    console.log(response);
                }).catch(error =>{
                     console.log("ERRRR:: ",error.response);
                });
            }   
        }, 
        loadData(){
            axios.get("https://serene-coast-99294.herokuapp.com/api/product/show")
            .then(res =>{  
              this.product = res.data.data 
            });
        },
        cleaner(){
            this.code='';
            this.name='';
            this.price='';
            this.picture='';
            this.isCategorySelected = '';
        }, 
        error(msg){
            this.errors = "message: "+msg
            this.isErrorMessage = true; 
        },
        burgerBarToogle(){ 
            let data = this.BarToogle
            bus.$emit("toogle", !data);
        } 
    },  
    mounted(){
        axios.get("https://serene-coast-99294.herokuapp.com/api/product/show")
        .then(res =>{
              this.product = res.data.data 
        });
         axios.get("https://serene-coast-99294.herokuapp.com/api/category/show")
        .then(res =>{
              this.category = res.data 
              this.isCategorySelected = '' 
        });
        
    },
    computed:{
        watchTable:function(){  
            return this.mounted();
        },
        filterData:function(){ 
            let category; 
            category =  this.product.filter(products => {  
                if (this.isCategorySelected) { 
                     return products.category_id === this.isCategorySelected; 
                } 
                return products.category_id           
            }); 
                if(this.product && this.product.length > 0){
                    return  category.filter(products => {   
                        return products.name.toLowerCase().match(this.search.toLowerCase()); 
                });    
            }  
             return "";                           
        }
    }
}
</script>
<style scoped>
    *{
        box-sizing:border-box;
        padding:0px;
        margin:0px;
    }
    /* BUTTON */
    .editbtn {
        background-color: #008CBA;
        color:white;
        font-size:15px;
        padding:5px;
        margin:0 5px; 
    }  
    .removebtn {
        background-color: #f44336;
        color:white;
        font-size:15px;
        padding:5px;
        margin:0 5px;
         
    }  
    button:hover{
        background-color:white;
        color:black;
        cursor:pointer;
    } 

    ul{
        list-style:none;
    }
    a{
        text-decoration:none;
        color:#EBEBEB;
    }
     .productlist_section{
        height: 100vh;
        overflow:auto;
        display:grid;
        grid-template-rows:70px 100vh; 

    }
    .productlist_section .productlist{
        display:grid;
        grid-template-rows:70px auto; 
       
    }  
    .productlist_section .productlist #list {
    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
    }

    .productlist_section .productlist #list td,.productlist_section .productlist #list th {
    border: 1px solid #ddd;
    padding: 8px;
    }

    .productlist_section .productlist #list tr:nth-child(even){background-color: #f2f2f2;}

    .productlist_section .productlist #list tr:hover {background-color: #ddd;}

    .productlist_section .productlist #list th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #4CAF50;
    color: white;
    }
    
    .productlist_section .productlist .filtersContainer{
        display:flex;
        justify-content: space-around;
        align-items: center;
    }
    .productlist_section .productlist .filtersContainer .functions{
        display:flex;
        justify-content: space-around;
        width:40%;
        height: 30px;
    }
    .productlist_section .productlist .filtersContainer .functions input{
        border:1px solid black;
        border-radius: 5px;
        width:50%;
        font-size: 20px;
        padding:10px;
    }
    .productlist_section .productlist .filtersContainer .functions span{
         font-size: 32px;
         margin:0px; 
         height: 100%;
           cursor:pointer;  
      }
    .productlist_section .productlist .filtersContainer .functions button{
         font-size:20px;
         width:30%;
         height: 100%;
         background-color:#4CAF50;
         color:white;
    }  
    
    .popup{
        position:fixed;
        top:0;
        bottom:0;
        left:0;
        right:0; 
        background-color:#4A4A4A;
        opacity: 1;
    }
     .register{ 
        background-color:white;  
        position:relative;
        margin:20px auto auto;
        width:50%;
        
        padding:50px;
        border:1px solid;
        border-radius:30px; 
    } 
    .productlist_section .register h2{
        color:black;
        font-size:2em;
        padding-bottom:20px;
    }
     .productlist_section .register form{
        display:grid;
        height: 50%;
        grid-gap:10px;
        grid-template-rows:auto auto auto auto auto;
        grid-template-columns:auto; 
        margin:0 20px; 
    }
    .productlist_section .register form input{
        background-color:#4A4A4A;
        border-radius: 15px;
        color:#EBEBEB;
        font-size:25px;
        padding:5px;
    }
    .productlist_section .register form select{
        background-color:#4A4A4A;
        border-radius: 15px;
        color:#EBEBEB;
        font-size:25px;
        padding:5px;
    }
    .productlist_section .register .buttons{ 
         width:100%;
         height: 50px;
    }
    .productlist_section .register .buttons .save {
         font-size:20px;
         width:50%;
         height: 50px;
         background-color:#4CAF50;
         color:white;
         cursor:pointer;
    }
    .productlist_section .register .buttons .cancel {
         font-size:20px;
         width:50%;
         height: 50px;
         background-color:#f44336;
         color:white;
         cursor:pointer;
    }
     
    
   
    

</style>