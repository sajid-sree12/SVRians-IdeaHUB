var al=require("./scr");
const myserver=require("mysql")

mydb2=myserver.createConnection({
    host:'localhost',
    user:'root',
    password:'19Am1a0307@',
    database:'SVREC'
    
})

for ( var counter = 0; counter <al.length; counter++)
{   
    
    counter=document.getElementById(counter)
    counter.addEventListener("click", function(){
      mydb2.query("update ideasdata set likes=likes+1 where slno=?",[counter])  
     });
    dislikbutton[counter].addEventListener("click", function(){
      
   });
}