<template>
    <div class="productlist_section"> 
        <div class="popup" v-if="isRegister">
            <div class="register">
                <h2>Company</h2> 
                <form name="myform" @submit.prevent = "save()" >
                    <input type="text"  name="name" id="name" placeholder="name" v-model ="name">
                    <textarea name="address" id="address" placeholder="address" v-model="address" cols="30" rows="10"></textarea>
                    <input type="number"  name="tin" id="tin" placeholder="tin" v-model="tin">  
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
                <h1>Company</h1>  
            </div> 
            <table id="list">
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Tin</th> 
                    <th>Actions</th> 
                </tr>
                <tr v-for="companies in company " :key=companies.id>
                    <td>{{companies.name}}</td>
                    <td>{{companies.address}}</td>  
                    <td>{{companies.tin}}</td>
                    <td>
                        <button class = "editbtn" @click = "edit(companies.id)" >Edit</button> 
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
            isSelected:'',
            search:'',
            isUpdate:false,
            isErrorMessage:false,
            errors:'',
// SELECTED CATEGORY
            isCategorySelected: 1,
// for fetch products list
            company:[],
            category:[], 
// Save Delete Data
            id:'',
            name:'',
            address:'',
            tin:'', 
        }
    },
    methods:{
        Register(){
             this.isRegister = true;
             this.isUpdate = false;
        },
        RegisterCancel(){
             this.isRegister = false 
        }, 
        save(){   
            axios.post("https://serene-coast-99294.herokuapp.com/api/company/save", { 
                name:this.name,
                address:this.address,
                tin:this.tin 
            }).then((response)=>{
                this.company = response.data
                console.log(response);
                this.isRegister = false; 
            }).catch(error => {
                this.error(error.response.data.message);  
            });  
        },
        error(msg){
            this.errors = "message: "+msg
            this.isErrorMessage = true; 
        },
        edit(id){ 
            for (let index = 0; index < this.company.length; index++) {
                if (id == this.company[index].id) {
                    this.name=this.company[index].name; 
                    this.address=this.company[index].address;
                    this.tin=this.company[index].tin; 
                } 
            }
            this.isErrorMessage = false;
            this.isRegister = true; 
            this.isUpdate = true;
        },
         
        loadData(){
            axios.get("https://serene-coast-99294.herokuapp.com/api/company/show")
            .then(res =>{
              this.company = res.data 
            });
        }, 
        burgerBarToogle(){ 
            let data = this.BarToogle
            bus.$emit("toogle", !data);
        }
    },  
    mounted(){ 
        axios.get("https://serene-coast-99294.herokuapp.com/api/company/show")
        .then(res =>{
              this.company = res.data 
        }); 
    }, 
    computed:{
        watchTable:function(){  
            return this.mounted();
        },
         
    }
}
</script>
<style scoped>
    *{
        box-sizing:border-box;
        padding:0px;
        margin:0px;
    }
    .editbtn {
        background-color: #008CBA;
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
        justify-content:space-around;
        align-items: center;
        width:40%;
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