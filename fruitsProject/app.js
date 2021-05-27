const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB",{useNewUrlParser: true, useUnifiedTopology: true});

const fruitSchema=new mongoose.Schema({
    name: String,
    rating: Number,
    review: String,
});

const Fruit=mongoose.model("Fruit",fruitSchema);

const apple=new Fruit({
    name: "Apple",
    rating: 7,
    review: "Pretty solid as a fruit!"
});

const banana=new Fruit({
    name: "Banana",
    rating: 6,
    review: "Great taste!"
});

const papaya=new Fruit({
    name: "Papaya",
    rating: 3,
    review: "Dont like its taste and smell!"
});

// Fruit.insertMany([apple,banana,papaya],function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Successfully saved all the fruits to fruitsDB");
//     }
// });

// Fruit.find(function(err, fruits){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(fruits);
//     }
// });

Fruit.find(function(err, fruits){
    if(err){
        console.log(err);
    }else{
        
        mongoose.connection.close();

        fruits.forEach(function(fruit){
            console.log(fruit.name);
        });
    }
});

const personSchema=new mongoose.Schema({
    name: String,
    age: Number
});

const Person=mongoose.model("Person",personSchema);

const person=new Person({
    name: "John",
    age: 32
});
person.save();

