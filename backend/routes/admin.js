const express =require('express')
const router=express.Router()
const adminControllers=require('../controllers/admincontrollers')


router.post('/adminlogin',adminControllers.adminLoginVerification)
router.get('/userslist',adminControllers.getAllUsers)
router.delete('/deleteuser',adminControllers.deleteUser)
router.put('/edituser',adminControllers.editUserProfile)
router.patch('/changestatus',adminControllers.changeUserStatus)
module.exports = router;