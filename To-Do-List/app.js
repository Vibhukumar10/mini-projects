const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const _=require('lodash');

const app=express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://admin-vibhu:test123@cluster0.7o6f6.mongodb.net/todolistDB",{useNewUrlParser: true,useUnifiedTopology: true});

const itemsSchema={
    name: String
};

const Item=mongoose.model("Item",itemsSchema);

const item1=new Item({
    name: "Welcome to yout todolist!"
});

const item2=new Item({
    name: "Hit the '+' button to add new items!"
});

const item3=new Item({
    name: "<-- Hit this to delete an item."
});

const defaultItems=[item1,item2,item3];



app.get("/", function(req,res){
    
    
    Item.find({},function(err,foundItems){
        if(foundItems.length===0){
            Item.insertMany(defaultItems,function(err){
                if(err)
                    console.log(err);
                else
                    console.log("Successfully appended!");
            });
            res.redirect("/");
        }else{
            res.render('list',{kindOfDay: "Today", newItem: foundItems});
        }
    });
});

app.post("/", function(req,res){
    const itemName=req.body.todo;
    const listName=req.body.list;
    
    const pushItem=new Item({
        name: itemName
    });

    if(listName==="Today"){
        pushItem.save();
        res.redirect("/");
    }else{
        List.findOne({name: listName},function(err, foundList){
            foundList.items.push(pushItem);
            foundList.save();
            res.redirect("/"+listName);
        });
    }

});

app.post("/delete",function(req,res){
    const checkedItemId=req.body.checkbox;
    const listName=req.body.list;

    if(listName==="Today"){
        Item.findByIdAndRemove(checkedItemId,function(err){
            if(!err){
                console.log("Successfully deleted checked item!");
                res.redirect("/");
            }
        });
    }else{
        List.findOneAndUpdate({name: listName},{$pull: {items: {_id: checkedItemId}}},function(err,foundList){
            if(!err){
                res.redirect("/"+listName);
            }
        });
    }

});

const listSchema={
    name: String,
    items: [itemsSchema]
};

const List=mongoose.model("List",listSchema);

app.get("/:customListName", function(req,res){
    const customListName=_.capitalize(req.params.customListName);

    List.findOne({name: customListName},function(err,foundList){
        if(!err){
            //create new list.
            if(!foundList){
                const list=new List({
                name: customListName,
                items: defaultItems
                });
                list.save();
                res.redirect("/"+customListName);
            }else{
                //show an existing list.
                res.render("list",{kindOfDay: foundList.name, newItem: foundList.items});
            }
        }
    });
});

let port=process.env.PORT;
if(port==null||port==""){
    port=3000;
}

app.listen(port, function(){
    console.log("The server is running on successfully.");
});