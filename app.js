const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/checkoutDB", {useNewUrlParser: true});

const checkoutSchema = {
    email : String,
    phone : Number,
    fullName : String,
    address : String,
    city : String,
    country : String,
    postalCode : Number
}

const itemSchema = {
    name : String,
    price : String
}

const Detail = mongoose.model("Detail", checkoutSchema);
const Item = mongoose.model("Item", itemSchema)

const item1 = new Item({
    name : "Vintage Bagpack",
    price : "$54.99"
});

const item2 = new Item({
    name : "Vintage Shoes",
    price : "$74.99"
});

const defaultItems = [item1,item2];

Item.insertMany(defaultItems, function(err){
    if(err) {
        console.log(err);
    } else {
        console.log("Sucessfully saved default items to DB");
    }
});

app.get("/", function(req,res){
    res.sendFile(__dirname + "/form.html");
});

app.get("/submit", function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
    const email = req.body.email;
    const phone = req.body.phone;
    const fullName = req.body.fullname;
    const address = req.body.address;
    const city = req.body.city;
    const country = req.body.country;
    const postalCode = req.body.postalcode;

    const detail = new Detail({
        email : email,
        phone : phone,
        fullName : fullName,
        address : address,
        city : city,
        country : country,
        postalCode : postalCode
    });

    detail.save(function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Sucessfully stored the details");
        }
    });

    res.redirect("/submit");
});













app.listen(3000, function(){
    console.log("Server running on port 3000");
});
