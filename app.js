const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const date=require(__dirname+"/date.js");//dirname ->because it static file that we made
const _ = require('lodash');

const app =express();

let newItem="";


app.set('view engine', 'ejs');//להשתמש ב-אקספרס כדי להשתמש כ -view enging

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

/*
let dailyItems=[];
let workItems=[];
let generalItems=[];
let familyItems=[];
*/
let items = {//intizilize the lists with 4 items
    "Daily": [],
    "Work": [],
    "General": [],
    "Family": []
  };

let day = date.getDate();

app.get("/",function(req,res){//get to home page

  console.log(Object.keys(items));//print in the cmd only the names of the arrays(list)

    res.render("home",{//show the home ejs and send to this page the items object
      items:items,

    });

   
 
    
    
});

app.post("/",function(req,res){


    
    let newListName=req.body.inputAddList;//take from the input the new list name
    newListName=newListName.replace(/\s+/g, '');//delete all the spaces-> because of the dir-more easier

    //console.log(newListName);
    const buttonName = req.body.buttonName;

    const buttonAddList=req.body.buttonAddList

    if(buttonName!=null){
      res.redirect(`/${buttonName}`);//if the user pushed on one of the list button ->move to this page
      
    }else if(buttonAddList!=null){//Else the user add a new list 
      items[newListName]=[];//make empty array to the new list and insert to the items object 
      res.redirect("/");//redirect to home page
    }

});

app.get('/favicon.ico', (req, res) => res.status(204));// to fix an error

app.get("/:category", function(req, res) {//
    
    console.log(req.params.category+" get");
    
   

    const category = req.params.category;//take the last paramter in the url

    console.log(category);

    
    res.render("list", {//show the list ejs
      listTitle: category, // send the name of the category/list name
      listItems: items[category],//send the items inside this list
      dir: `/${category}`//send the dir for functional
    });

     


  });
  
  app.post("/:category", function(req, res) {
    console.log("----------------------");
    console.log(req.params.category+" post");
    console.log("----------------------");

    const category = req.params.category;//take the last paramter in the url
    if (req.body.list === "Home") {//if the user push the home button
      res.redirect("/");//redircet to home page
    } else {
      const newItem = req.body.newItem;//else the user pushed the add button ,so take the inpute
      items[category].push(newItem);//insert to the list array
      res.redirect(`/${category}`);//redirect to refresh the page
    }
  });

 


app.listen(3000,function(){
    console.log("Server is running on port 3000");
});



