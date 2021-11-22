const mongoose=require('mongoose');
const Schema= mongoose.Schema;


 const projectSchema=Schema({
     creator:{
         type:String,
         required:true
     },
     builder:{
        type:String,
        default:"unknown"
    },
     title:{
        type:String,
        required:true
    },
    dateStart:{
         type:Date,
         required:true
     },
    
     dateEnd:{
        type:Date,
        required:true
    }, 
     price:{
        type:Number,
        required:true
    },

     description:{
         type:String,
         required:false
     },
     projectLink: {
        type: String,
      },
      dateCreation: {
        type: Date,
        default: Date.now()
    },
    /* user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
       
      }, */
     
 })

 module.exports=Project=mongoose.model('Project',projectSchema)
//create the shema 
//creat ethe model 
//export the model 