const path = require('path');
const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/get-user', userController.getUsers);

router.post('/add-user', userController.postAddUser);

router.delete('/delete/:userId', userController.deleteOrEditUser);

// router.put('/update/:userId', userController)

module.exports = router;