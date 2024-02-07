const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const Chat = require("./model/chats.js");
const methodOverride = require("method-override");




app.use(express.urlencoded({extended:true}));
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));


main().then(() => {
    console.log("Connection success.");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}



//get route
app.get("/chats", async (req,res) => {
    let Chats = await Chat.find();
    
    res.render("chat.ejs",{Chats});
});

// new chat route
app.get("/chats/new",(req,res) => {
    res.render("new.ejs");
});

//save data in db

app.post("/chats",(req,res) => {
    let {from, to, msg} = req.body;
    let chat = new Chat({
        from : from,
        to : to,
        msg : msg,
        created_at : new Date(),
    });
    chat.save().then(() => {
        console.log("chat was saved");
    }).catch((err) => {
        console.log(err);
    });
    res.redirect("/chats");
});

//edit message 
app.get("/chats/:id/edit",async (req,res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
});


//update message
app.put("/chats/:id",async (req,res) => {
    let {id} = req.params;
    let {msg : newMsg} = req.body;
    let updateChat = await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidator:true,new:true});
    console.log(updateChat);
    res.redirect("/chats");
});

// Destroy route
app.delete("/chats/:id",async (req,res) => {
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
});

app.get("/",(req,res) => {
    res.send("root is working!");
});

app.listen(8080,() => {
    console.log("Listening port 8080");
})
