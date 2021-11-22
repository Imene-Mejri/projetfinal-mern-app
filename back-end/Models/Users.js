const mongoose=require('mongoose');
 const Schema= mongoose.Schema;

 const userSchema=Schema({
     name:{
         type:String,
         required:true
     },
     lastName:{
         type:String,
         required:true
     },
     email:{
         type:String,
         required:true,
         unique:true
     },
     password:{
         type:String,
         required:true
     },

     role: {
        type: String,
        default:'client'
      },
      status: {
        type: String,
        default:'AVAILABLE'
      },
       dateCreation: {
        type: Date,
        default: Date.now()
    }
      
 })

 module.exports=User=mongoose.model('User',userSchema)
//create the shema 
//creat ethe model 
//export the model 