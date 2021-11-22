const express = require('express');
const router = express.Router();
let Innvoice = require('../Models/Innvoice');
let Users = require('../Models/Users');

/* //@role :find in-process status
//@url:http://localhost:5000/api/auth/freelancer/innvoice/findInprocess/:freelancerId
//public/private
*/
router.get("/findInprocess/:freelancerId",async(req,res)=>{
    Innvoice.find({
        $or: [
          { usersId: req.params.freeId, status: "IN-PROCESS" },
          { usersId: req.params.freeId, status: "ACCEPTED" },
        ],
      })
        .exec()
        .then((response) => {
          if (response.length == 0) {
            res.status(200).json({
              message: "No innvoice are available",
            });
          } else {
            res.status(200).json({
              Innvoice: response,
            });
          }
        })
        .catch((err) => {
          console.log( err);
          res.status(500).json({
            error: err,
          });
        });
})
/* //@role :find in-process status
//@url:http://localhost:5000/api/auth/freelancer/innvoice/Myinnvoice/:freelancerId
//public/private
*/
router.get('/Myinnvoice/:freelancerId',async (req,res)=>{
    Innvoice.find({ usersId: req.params.freeId })
   .exec()
   .then((response) => {
     if (response.length == 0) {
       res.status(200).json({
         message: "No Innvoice are available",
       });
     } else {
       res.status(200).json({ Innvoice: response });
     }
   })
   .catch((err) => {
     console.log("Find All Innvoice Error: " + err);
     res.status(500).json({
       error: err,
     });
   });
})
/* //@role :update innvoice status
//@url:http://localhost:5000/api/auth/freelancer/innvoice/status/:innvoiceId
//public/private
*/
router.patch("/status/:innvoiceId",async (req,res)=>{
    await Innvoice.updateOne(
        { id: req.params.innvoiceId },
        { $set: { status: req.body.status } }
      )
        .exec()
        .then((response) => {
           Innvoice.findOne({ id: req.params.innvoiceId  })
            .exec()
            .then((Users) => {
              //console.log(obj);
              const freeId = Users.Id;
              
              if (req.body.status === "ACCEPTED") {
                 Users.updateOne(
                  { id: freeId },
                  {
                    $set: { status: "NOT AVAILABLE" },
                  }
                )
                  .then((response) => {
                    console.log("freelancer Status: NOT AVAILABLE");
                  })
                  .catch((err) => {
                    console.log("freelancer Status Error: " + err);
                  });
              } else {
                Users.updateOne(
                  { id: freeId },
                  {
                    $set: { status: "AVAILABLE" },
                  }
                )
                  .then((response) => {
                    console.log("freelancer Status: AVAILABLE");
                  })
                  .catch((err) => {
                    console.log("freelancer Status Error: " + err);
                  });
              }
            })
            .catch((err) => {
              console.log("Find Innvoice Error: " + err);
            });
          console.log("Innvoice Updated Successfully");
          res.status(200).json({
            message: "Request Updated Successfully",
          });
        })
        .catch((err) => {
          console.log("Innvoice Update error: " + err);
          res.status(500).json({ "Innvoice Update error ": err });
        });
})







module.exports = router