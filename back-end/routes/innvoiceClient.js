const express = require('express');
const router = express.Router();
let Innvoice = require('../Models/Innvoice');

/* //@role :add
//@url:http://localhost:5000/api/auth/client/innvoice/addInnvoice
//public/private
*/
router.post('/addInnvoice', async (req,res)=>{
    const {sender,receiver,  dateSent, object,message}=req.body
    try {
        const newInnvoice= new Innvoice({sender,receiver,dateSent, object,message})
        const innvoice= await newInnvoice.save()
        res.status(201).json({msg:'the innvoice is adeded',innvoice})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
})
/* //@role :add
//@url:http://localhost:5000/api/auth/client/innvoice/all
//public/private
*/
router.get("/all",async(req,res)=>{
    await Innvoice.find()
    .exec()
    .then((response) => {
      if (response.length == 0) {
        res.status(200).json({
          message: "No INNVOICE",
        });
      } else {
        res.status(200).json({
          innvoice1: response,
        });
      }
    })
    .catch((err) => {
      console.log("Find All Accepted invoice Error: " + err);
      res.status(500).json({
        error: err,
      });
    });
})
/* //@role :send a innvoice to freelancer
//@url:http://localhost:5000/api/auth/client/innvoice/sendInnvoice/:innvoiceId
//public/private
*/
router.patch('/sendInnvoice/:innvoiceId',async (req,res)=>{
    const innvoiceId = req.params.innvoiceId;
    //updateOne({ _id: id }, { $set: req.body }
   await Innvoice.updateOne(
      { id: innvoiceId },
      { $set: { status: "IN-PROCESS", freelancerId: req.body.freelancerId } }
    )
      .exec()
      .then((response) => {
        res.status(200).json({
          message: "Innvoice Successfully send to freelancer",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
})
module.exports = router