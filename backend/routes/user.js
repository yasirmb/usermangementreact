const express =require('express')
const router=express.Router()
const userControllers=require('../controllers/usercontrollers')


router.post('/usersignup',userControllers.userSignUp)
router.post('/apiverification',userControllers.apiVerification)
router.post('/userlogin',userControllers.verifyUserLogin)
router.post('/profileupdate',userControllers.profileUpload)


module.exports = router;



