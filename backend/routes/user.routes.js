const express = require('express');
const { registerUser, loginUser, logOut } = require('../controllers/auth.controller');

const userRouter = express.Router();


userRouter.post('/signUp',registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/logout', logOut);