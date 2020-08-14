<template>
    <div class="main_section">
        <div class="categorylist">
            <ul>
                <li v-for="arrays in array" :key="arrays.id" @click="SelectedCategory(arrays.id)">{{arrays.name}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
 import axios from 'axios';
import {bus} from "../main.js"

export default{
    data(){
        return{
            array:[],
            category_id:0
        }
    }, 
     mounted(){  
         axios.get("https://serene-coast-99294.herokuapp.com/api/category/show")
        .then(res =>{
            this.array = res.data  
            this.category_id = res.data[0].id   
            bus.$emit("Category",this.category_id);
        });
          
    },
    methods:{
        SelectedCategory(category_id){ 
            this.category_id = category_id; 
            bus.$emit("Category",this.category_id);  
            
        },  
    },
     
}
</script>
<style  scoped>
*{
    margin:0;
    padding:0;
    list-style: none;
}
.main_section , .categorylist{
    height :90vh;
    overflow:auto;
}
.main_section .categorylist ul{
    display:flex;
    flex-direction: column;
    align-items: center;
    color:white;
}
.main_section .categorylist ul li{
    margin:5px;
    padding:10px;
    background-color:#707070;
    border:1px solid #707070;   
    border-radius: 10px;
    width:100%;
    text-align:center;
}
.main_section .categorylist ul li:hover{
    background:blue;
    cursor:pointer;
}
.main_section .categorylist ul li:active{
    background:pink;
    cursor:pointer;
}
 
</style>