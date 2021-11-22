const express = require('express');
const router = express.Router();
let Users = require('../Models/Users');


/* //@role :update a count
//@url:http://localhost:5000/api/auth/updateProfile/:id
//public/private
*/
router.put("/updateProfile/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await Users.findByIdAndUpdate(id, {$set: req.body })
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});
/* //@role :delete a count
//@url:http://localhost:5000/api/auth/deleteProfile/:id
//public/private
*/
router.delete('/deleteProfile/:id', async(req,res)=>{
  const id=req.params.id
  await Users.findByIdAndRemove(id)
  .then(
      user=>{
          if(user){return res.status(200).json({msg:`the user is deleted ${user}`})}
         else{
             return res.status(404).json({msg:'user not found'})
         } 
      }
  )
  .catch(err=>{return res.status(500).json({error:err})})
}) 
module.exports = router