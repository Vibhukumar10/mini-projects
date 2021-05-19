const express=require('express');
const bodyParser=require('body-parser');
const date=require(__dirname + "/date.js");

const app=express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const tasks=['Go for a walk','Eat Food','Brush Teeth'];

app.get("/", function(req,res){
    const day=date.getDate();
    res.render('list',{kindOfDay: day, newItem: tasks});
});

app.post("/", function(req,res){
    task=req.body.todo;
    tasks.push(task);
    res.redirect("/");
});

app.listen(3000, function(){
    console.log("The server is running on port 3000.");
});