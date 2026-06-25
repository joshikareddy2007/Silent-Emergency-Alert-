const express=require("express");
const bodyParser=require("body-parser");
const cors=require("cors");
const twilio=require("twilio");

const app=express();
app.use(bodyParser.json());
app.use(cors());

const accountSid="AC7366739c2c2e596c6587e2e059210f20";
const authToken="de569a5e0e296b80c7a484025abc66a7";
const client=twilio(accountSid,authToken);

app.post("/send-alert",async(req,res)=>{

const {contacts,latitude,longitude,type,name,phone}=req.body;

const msg=`🚨 ${type} EMERGENCY!

User: ${name}
Phone: ${phone}

Location:
https://maps.google.com/?q=${latitude},${longitude}`;

try{
for(let n of contacts){
await client.messages.create({
body:msg,
from:"+12059646378",   // your Twilio number
to:n
});
}

res.send("✅ Emergency SMS Sent");

}catch(err){
console.log(err.message);
res.status(500).send(err.message);
}

});

app.listen(5000,()=>console.log("Server running"));
