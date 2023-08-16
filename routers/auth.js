const express = require('express');
const dbManager = require('../db/manager.db');
const authService = require('../services/auth.service');

const router = express.Router();

// 회원가입
router.post('/signin', async (req, res) => {

  const {email, password} = req.body;

  const result = await authService.signup(email, password);

  if (result.code == 201){
    res.status(200).send({result: true, insertedId : result.result.rows.insertId});    
  }else if (result.code == 500){
    res.status(500).send({result: false, message: result.result.error.message});
  }else{
    res.status(result.code).send({result: false, message: result.message});
  }
  next();
});

// 로그인
router.post('/login', async (req, res) => {
  const {email, password} = req.body;


  const result = await authService.login(email, password);

  if(result.code == 200){
    res.status(200).send({result: true, accessToken: result.result.accessToken });  
  }else if(result.code == 500){
    res.status(500).send({result: false, message: result.result.error.message});
  }else{
    res.status(result.code).send({result: false, message: result.message})
  }

  next();
});


module.exports = router;