<template>
    <div class="Userslist_section"> 
        <div class="popup" v-if="isRegister">
            <div class="register">
                <h2>Users</h2>  
                <form name="myform" @submit.prevent = "save()" >
                    <input type="text"  name="name" id="name" placeholder="name" v-model ="name"> 
                    <input type="email"  name="email" id="email" placeholder="email" v-model="email"> 
                    <!-- <input type="password"  name="password" id="password" placeholder="password" v-model="password" >   -->
                    <div class="buttons"> 
                        <button class="save" @click.prevent = "save">Save</button> 
                        <button @click = "RegisterCancel" class="cancel">Cancel</button> 
                    </div>
                    <h3 v-if="isErrorMessage" style="color:red;">{{errors}}</h3>
                </form>
            </div>
        </div> 
        <div class="Userslist"> 
          <div class="filtersContainer">  
                <h1>Users</h1> 
                   <div class="functions"> 
                        <input type="text" name="" id="" placeholder="Search ..." v-model = "search"> 
                    </div>
            </div> 
            <table id="list">
                <tr>
                    <th>Name</th>
                    <th>Email</th> 
                    <th>Actions</th> 
                </tr>
                <tr v-for="(users) in filterData " :key=users.id>
                    <td>{{users.name}}</td>
                    <td>{{users.email}}</td>  
                    <!-- <td>{{users.password}}</td> -->
                    <td>
                        <button class = "editbtn" @click = "edit(users.id)" >Edit</button> 
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
// for fetch Userss list
            User:[], 
// Save Delete Data
            id:'',
            name:'',
            email:'',
            password:'', 
        }
    },
    methods:{
        Register(){
             this.isRegister = true;
             this.isUpdate = false;
             this.cleaner();
        },
        RegisterCancel(){
             this.isRegister = false 
        }, 
        save(){   
            axios.post("https://serene-coast-99294.herokuapp.com/api/user/save", {
                id:this.id, 
                name:this.name,
                email:this.email,
                // password:this.password 
            }).then((response)=>{
                this.User = response.data
                console.log(response);
                this.isRegister = false; 
            }).catch(error => {
                this.error(error.response.data.message); 
                console.log(error.response.data); 
            });  
        },
        error(msg){
            this.errors = "message: "+msg
            this.isErrorMessage = true; 
        },
        edit(ids){ 
            for (let index = 0; index <= this.User.length -1 ; index++) {
                if (ids == this.User[index].id) {
                    this.id=this.User[index].id; 
                    this.name=this.User[index].name; 
                    this.email=this.User[index].email; 
                } 
            } 
            this.isErrorMessage = false; 
            this.isUpdate = true;
            this.isRegister = true;
        },
        remove(id,event){
            if (confirm('Are you sure you want to remove this thing into the database?')) {
                axios.post("https://serene-coast-99294.herokuapp.com/api/user/delete",{id:id}).then((response) =>{
                    alert(id);
                    this.User.splice(this.User.indexOf(event), 1);
                    console.log(response); 
                    
                }).catch(error =>{
                     console.log("ERRRR:: ",error.response.data);
                });
            }   
        },
         
        loadData(){
            axios.get("https://serene-coast-99294.herokuapp.com/api/user/show")
            .then(res =>{
              this.User = res.data 
            });
        }, 
        burgerBarToogle(){ 
            let data = this.BarToogle
            bus.$emit("toogle", !data);
        },
        cleaner(){
            this.id='';
            this.name='';
            this.email='';
            this.password=''; 
        },
    },  
    mounted(){
        axios.get("https://serene-coast-99294.herokuapp.com/api/user/show")
        .then(res =>{
              this.User = res.data 
        }); 
    },
    computed:{
        watchTable:function(){  
            return this.mounted();
        },
         filterData:function(){
            if(this.User && this.User.length > 0){
                return this.User.filter(Users => {  
                    return Users.name.toLowerCase().match(this.search);
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
     .Userslist_section{
        height: 100%;
        /* width:100%;    */


    }
    .Userslist_section .Userslist{
        display:grid;
        grid-template-rows:70px auto; 
    }  
    .Userslist_section .Userslist #list {
    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
    }

    .Userslist_section .Userslist #list td,.Userslist_section .Userslist #list th {
    border: 1px solid #ddd;
    padding: 8px;
    }

    .Userslist_section .Userslist #list tr:nth-child(even){background-color: #f2f2f2;}

    .Userslist_section .Userslist #list tr:hover {background-color: #ddd;}

    .Userslist_section .Userslist #list th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #4CAF50;
    color: white;
    }
    
    .Userslist_section .Userslist .filtersContainer{
        display:flex;
        justify-content:space-around;
        align-items: center;
         
    }
    .Userslist_section .Userslist .filtersContainer .functions{
        display:flex;
        justify-content: space-around;
        width:40%;
        height: 30px;
    }
    .Userslist_section .Userslist .filtersContainer .functions input{
        border:1px solid black;
        border-radius: 5px;
        width:50%;
        font-size: 20px;
        padding:10px;
    }
    .Userslist_section .Userslist .filtersContainer .functions span{
         font-size: 32px;
         margin:0px; 
         height: 100%;
           cursor:pointer;  
      }
    .Userslist_section .Userslist .filtersContainer .functions button{
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
    .Userslist_section .register h2{
        color:black;
        font-size:2em;
        padding-bottom:20px;
    }
     .Userslist_section .register form{
        display:grid;
        height: 50%;
        grid-gap:10px;
        grid-template-rows:auto auto auto auto auto;
        grid-template-columns:auto; 
        margin:0 20px; 
    }
    .Userslist_section .register form input{
        background-color:#4A4A4A;
        border-radius: 15px;
        color:#EBEBEB;
        font-size:25px;
        padding:5px;
    }
    .Userslist_section .register form select{
        background-color:#4A4A4A;
        border-radius: 15px;
        color:#EBEBEB;
        font-size:25px;
        padding:5px;
    }
    .Userslist_section .register .buttons{ 
         width:100%;
         height: 50px;
    }
    .Userslist_section .register .buttons .save {
         font-size:20px;
         width:50%;
         height: 50px;
         background-color:#4CAF50;
         color:white;
         cursor:pointer;
    }
    .Userslist_section .register .buttons .cancel {
         font-size:20px;
         width:50%;
         height: 50px;
         background-color:#f44336;
         color:white;
         cursor:pointer;
    }
     
    
   
    

</style>