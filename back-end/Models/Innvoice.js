const mongoose=require('mongoose');
const Schema= mongoose.Schema;

 const innvoiceSchema=Schema({
     sender:{
         type:String,
         required:true
     },
     receiver:{
        type:String,
        required:true
    },
    dateSent:{
         type:Date,
         required:true
     },
     projet:{
         type:String,
         required:false
     },
     message:{
        type:String,
        required:false
    },
    status: {
        type: String,
        default: "IN-PROCESS",
      },
   
      dateCreation: {
        type: Date,
        default: Date.now()
    },
   
     
     
 })

 module.exports=Innvoice=mongoose.model('Innvoice',innvoiceSchema)