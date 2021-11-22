const express = require('express')
const router = express.Router()
let Project = require('../Models/Project')
/* var gravatar = require('gravatar'); */
const bcrypt = require('bcryptjs');



//@role :testing
//@url:http://localhost:5000/api/auth/client/project/test
//public/private
router.get('/test', async (req, res) => {
    await res.json('it is working wright now with feres')

})
/* //@role :add
//@url:
//public/private
*/

router.post('/add',async(req,res)=>{
    const {creator,builder,title, price, description, projectLink, dateStart,dateEnd}=req.body
    try {
        const newProject= new Project({creator,builder,title, price, description, projectLink, dateStart,dateEnd})
        const project= await newProject.save()
        res.status(201).json({msg:'the project is adeded',project})
    } catch (error) {
        res.status(500).json({msg:error.message})
        
    }
})
  //@role :Read all users
    //@url:http://localhost:5000/api/auth/client/project/all
    //public/private
    router.get('/all', async (req, res) => {
        await Project.find()

            .then(
                //testing the error handling if the data is empty 
                project => {
                    if (!project) {
                        return res.status(404).json({ msg: 'no data here ..' })
                    }
                    res.json(project)
                }
            )
            .catch(error => res.status(404).json({ msg: 'there is no project' }))


    })
 //@role :Delete project
    //@url:http://localhost:5000/api/auth/client/project/delete:id
    //public/private
    router.delete('/delete/:id', async(req,res)=>{
        console.log('delete')
        const id=req.params.id
        await Project.findByIdAndRemove(id)
        .then(
            project=>{
                if(project){return res.status(200).json({msg:`the user is deleted ${project}`})}
               else{
                   return res.status(404).json({msg:'user not found'})
               } 
            }

        )
        .catch(err=>{return res.status(500).json({error:err})})
    }) 
/* //@role :update  users
//@url:http://localhost:5000/api/auth/client/project/edit:id
//public/private 

*/
router.put("/edit/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
      const project = await Project.findByIdAndUpdate(id, {$set: req.body })
      res.status(200).json(project)
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });



module.exports = router