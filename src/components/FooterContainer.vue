<template>
    <div class="footer"> 
       <div class="container">
           <div class="socialMediaAccout">
                            <ul>
                                <li><a href="https://github.com/Jayiem23-tech" target="_blank"><i class="fa fa-github" style="font-size:36px"/></a></li>
                                <li><a href="https://www.linkedin.com/in/john-mark-romero-a27388167" target="_blank"  ><i class="fa fa-linkedin" style="font-size:36px"/></a></li>
                            </ul>
                        </div>
            <div>
                <p>email:johnmark.romero23@gmail.com<br><br>
                    Contact : 09750967249</p>
            </div>
            <br><br>
            <div>
                <p>This is created as my Portfolio to showcase my Skillset. 
                It is created using Vue.js and Laravel Api
                The code for this website is available at <a href="https://github.com/Jayiem23-tech" target = '_blank'>github.com</a></p> 
            </div><br><br>
            <div>
                <p>	&copy; John Mark Romero 2020</p>    
            </div> 
       </div> 
    </div>
</template>

<script>
export default { 
}
</script>
 
<style scoped>
    *{
        list-style: none;
        text-decoration: none;
        margin:0px;
        padding:0px;
        color:whitesmoke;
    } 
   
    /* FOR MOBILE AND TABLET */
@media (max-width:900px) {
    .footer{
        display: flex;
        background-color: rgb(27, 38, 44);
        height: 260px;
        padding:80px;
        font-size: .9em;
        font-style: normal;
    } 
    .container{
        width:100%; 
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
    a{
        text-decoration: underline;
        color:blue;
    }
    .socialMediaAccout ul{
        display:flex;
        justify-content: center;
        align-items:center; 
        width:100px;
        margin:10px;
    }
    .socialMediaAccout ul li{
         width:100%;
       /* height:100%;   */
    }
}
 /* FOR WEB BROWSER */
@media(min-width:901px){
 .footer{
        display: flex;
        background-color: rgb(27, 38, 44);
        height: 260px;
        padding:80px;
    } 
    .container{
        width:50%; 
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
    a{
        text-decoration: underline;
        color:blue;
    }
    .socialMediaAccout ul{
        display:flex;
        justify-content: center;
        align-items:center; 
        width:100px;
        margin:10px;
    }
    .socialMediaAccout ul li{
         width:100%;
       /* height:100%;   */
    }
}
      
</style>
