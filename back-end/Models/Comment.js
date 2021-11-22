const mongoose=require('mongoose');
const Schema= mongoose.Schema;


 const commentaireSchema=Schema({
     sender:{
         type:String,
         required:true
     },
     email:{
        type:String,
        required:true
    },
      dateCreation: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
     
 })

 module.exports= Commentaire =mongoose.model('Comment',commentaireSchema)