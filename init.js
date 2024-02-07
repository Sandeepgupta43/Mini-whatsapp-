const mongoose = require('mongoose');
const Chat = require("./model/chats.js");






main().then(() => {
    console.log("Connection success.");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [
    {
        from : "Shivank1",
        to : "Sandeep1",
        msg : "Send me your resume1",
        created_at : new Date(),
    },
    {
        from : "Shivank2",
        to : "Sandeep2",
        msg : "Send me your resume11",
        created_at : new Date(),
    },
    {
        from : "Shivank110",
        to : "Sandeep178",
        msg : "Send me your resume001",
        created_at : new Date(),
    },
    {
        from : "Shivank12345",
        to : "Sandeep12345",
        msg : "Send me your resume1234",
        created_at : new Date(),
    },
];




Chat.insertMany(allChats);