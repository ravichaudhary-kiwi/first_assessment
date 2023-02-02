const express = require('express');
const router = express.Router();
const { createUser, loginUser, viewUser, updateUser, deleteUser } = require('../controller/userController');
const { createAdmin, loginAdmin, viewAdmin, allUsers, updateAdmin, deleteAdmin, adminActive, adminDeactivate } = require('../controller/adminController');
const { userAuth, adminAuth} = require('../validate/auth');
const { createPost } = require('../controller/postController');

router.post('/create',createUser);
router.post('/login',loginUser);
router.get('/read',userAuth,viewUser);
router.patch('/update',userAuth,updateUser);
router.delete('/delete',userAuth,deleteUser);

router.post('/createadmin',createAdmin);
router.post('/loginadmin',loginAdmin);
router.get('/viewadmin',adminAuth,viewAdmin);
router.get('/allUsersData',adminAuth,allUsers);
router.patch('/updateUserData',adminAuth,updateAdmin);
router.delete('/deleteUserData',adminAuth,deleteAdmin);
router.post('/createpost',userAuth, createPost);
router.put('/activate',adminAuth,adminActive);
router.put('/deactivate',adminAuth,adminDeactivate);

module.exports = router;