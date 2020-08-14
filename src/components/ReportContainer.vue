<template> 
    <div class="productlist">
        <div class="filtersContainer">
            <h1>Transaction History</h1> 
        </div>
        <table id="list">
            <tr>
                <th>Date</th>
                <th>Transaction No.</th>
                <th>Items</th> 
                <th>Vat</th>
                <th>Vatable Sales</th>  
                <th>Total Amount</th>  
            </tr>
            <tr v-for="data in datas " :key=data.id>
                <td>{{data.created_at}}</td>
                <td>{{data.transno}}</td> 
                <td>{{data.totalItems}}</td>   
                <td>{{data.vat}}</td> 
                <td>{{data.vatableSales}}</td> 
                <td>{{data.totalAmount}}</td>  
            </tr>
        </table> 
    </div>  
</template>
<script>
    import axios from 'axios';
    import jsPDF from 'jspdf';
    import 'jspdf-autotable';
    export default{
        data(){
            return{
                datas:[]
            }
        },
        methods:{
            SaveAsPdf(){    
                var doc = new jsPDF() ;
                doc.text("Company Name: Your Company",10,10)
                doc.text("Sales Report",10,30)
                doc.text("Date : 10-05-2020",50,30)
                doc.line(0,35, 400, 35)
                doc.autoTable({ 
                margin: { top: 40 },
                head: [['Name', 'Email', 'Country']],
                body: [
                    ['David', 'david@example.com', 'Sweden'],
                    ['Castille', 'castille@example.com', 'Spain'] 
                    ],
                }) 
                    doc.save('table.pdf')
            },
            GenerateSalesReport(){
                axios.get("https://serene-coast-99294.herokuapp.com/api/reports/sales").then(response =>{
                    this.datas = response.data
                }) 
            }
        },
        mounted(){
            this.GenerateSalesReport();
        },
        // computed:{
        //     filterData(){
                
        //     }
        // }
        
    }
</script>
<style scoped>
     .productlist{
        height: 100vh;
        overflow:auto;
        display:grid;
        grid-template-rows:70px 100vh; 
    }  
     .productlist #list {
    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
    overflow: auto;
    
    }

     .productlist #list td, .productlist #list th {
    border: 1px solid #ddd;
    padding: 8px;
    }

     .productlist #list tr:nth-child(even){background-color: #f2f2f2;}

     .productlist #list tr:hover {background-color: #ddd;}

     .productlist #list th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #4CAF50;
    color: white;
    }
    
    .productlist .filtersContainer{
        display:flex;
        justify-content: space-around;
        align-items: center; 
    }
    .productlist .filtersContainer .functions{
        display:flex;
        justify-content: space-around;
        width:40%;
        height: 30px;
    }
     .productlist .filtersContainer .functions input{
        border:1px solid black;
        border-radius: 5px;
        width:50%;
        font-size: 20px;
        padding:10px;
    }
     .productlist .filtersContainer .functions span{
         font-size: 32px;
         margin:0px; 
         height: 100%;
           cursor:pointer;  
      }
     .productlist .filtersContainer .functions button{
         font-size:20px;
         width:30%;
         height: 100%;
         background-color:#4CAF50;
         color:white;
    }  
</style>