const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then(() =>{
    console.log("connected successful")
})
.catch((err) => {
    console.log(err)
});

async function main() {
  await mongoose.connect(MONGO_URL);

}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));   // beacuse jo bhi req mein aaye oh parse ho jaye   
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.get("/",(req,res)=>{
    res.send("Hi, i am root ");
});

//index route
app.get("/listings",async(req,res)=>{
    const alllistings =   await Listing.find({});
    res.render("listings/index.ejs",{alllistings});
    });

 //new route
 app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");

 });    

//show route
 app.get("/listings/:id",async(req,res)=>{
     let {id} = req.params;   // extractt is req.params
     const listing = await Listing.findById(id);   // jo bhi data aayega usse pass kerdenge show.ejs ko
    res.render("listings/show.ejs",{listing})
    });

//create route
app.post("/listings",async(req,res)=>{
   // let {title,description,image,price,country,location} = req.body;
   
   const newListing = new Listing(req.body.listing);
   await newListing.save();
   res.redirect("/listings");
});   

//Edit route
app.get("/listings/:id/edit",async(req,res)=>{
       let {id} = req.params;   // extractt is req.params
     const listing = await Listing.findById(id);  
    res.render("listings/edit.ejs",{listing});
});
   
//update route
app.put("/listings/:id",async(req,res)=>{
     let {id} = req.params;   // extractt is req.params
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
});

//delete route
app.delete("/listings/:id",async(req,res)=>{
     let {id} = req.params;   // extractt is req.params
    let deleteListings = await Listing.findByIdAndDelete(id);
    console.log(deleteListings);
    res.redirect("/listings");
});


// app.get("/testListing",async(req,res)=>{
//     let sampleListing = new Listing({
//         title : "My New Villa",
//         description : "By the Beach",
//         price : 12000,
//         location : "Calangute,Goa",
//         country : "India",
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });
app.listen(8080,()=>{
    console.log("server is listenig port 8080");
});