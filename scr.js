const express=require('express')
const myserver=require('mysql')
const bodyParser=require('body-parser');
const { redirect } = require('express/lib/response');
const { all } = require('express/lib/application');
mydb=myserver.createConnection({
    host:'localhost',
    user:'root',
    password:'19Am1a0307@',
    database:'SVREC'
});

mydb.connect((err)=>{
    if(err) throw err;
    console.log("Mysql Connected");
});

mydb2=myserver.createConnection({
    host:'localhost',
    user:'root',
    password:'19Am1a0307@',
    database:'SVREC'
    
})
mydb2.connect((err)=>{
    if (err) throw err;
    console.log("db2 connected")
})
var allideas;
mydb2.query("select slno,username,idea from ideasdata order by slno desc;",(err,result)=>{ 
    if (err) throw err;
    allideas=result;
})

myapp=express()





myapp.post('/login',bodyParser.urlencoded({extended:false}),(req,res)=>{
    var name =req.body.fullname
    var rollno=req.body.rollnumber
    var email=req.body.rollnumber+"@svrec.ac.in"
    var mobile=req.body.mobile
    var password=req.body.password
    var  sql="INSERT INTO STUDENTS(sname,sroll,semail,smobile,spassword) VALUES (?,?,?,?,?)";
    mydb.query("select * from students where sroll=?;",[req.body.rollnumber],(err,result)=>{
        if (result.length>0){
            res.redirect("/add")
        }
        else{
            mydb.query(sql,[name,rollno,email,mobile,password],(err,result)=>{
                if(err) throw err;
                console.log(result)
                res.redirect("/extract");
            });
        }
    })
    
});

myapp.use("/assets",express.static("assets"));
myapp.get("/",(req,res)=>{
    res.render('ex',{ideas:allideas});
    
});
myapp.listen(4500,()=>{
    console.log("server listening")
});
myapp.set('views','./pages')
myapp.set('view engine','ejs');
myapp.get("/add",(req,res)=>{;
    
    res.render("svrec")
    
});

var data;
myapp.post("/redi",bodyParser.urlencoded({extended:false}),(req,res)=>{
    mydb.query("select * from students where sname=? and spassword=?;",[req.body.user,req.body.lpassword],(err,result)=>{
        if (result.length>0){
            
            res.render("dashboard")

            loginuser=req.body.user;
            
        }
        else{
            
            res.redirect('back')
            
        }

    })})

myapp.get("/extract",(req,res)=>{
    res.render("show")
})
var loginuser;
myapp.post("/create",bodyParser.urlencoded({extended:false}),(req,res)=>{
    mydb.query("Insert into ideasdata(username,idea) values(?,?);",[loginuser,req.body.postidea],(err,result)=>{
                if(err) throw err;
                console.log(result)
                require("./scr")
                res.redirect("dashboard");
    });
    
})

module.exports.allideas=all;
