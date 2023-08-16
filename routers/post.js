const express = require('express');
const dbManager = require('../db/manager.db');
const postService = require('../services/post.service');
const authModel = require('../models/auth.model');
const postModel = require('../models/post.model');


const router = express.Router();

// 게시물 생성
router.post('/', async (req, res) => {

  const {title, content} = req.body;
  let authHeader = req.headers.authorization;
  if(authHeader == undefined){
      res.status(404).send({result: false, message: "사용자 정보가 없습니다."});
  }
  let token = authHeader && authHeader.split(" ")[1];

  const userInfo = await authModel.getUserId(token);
  if(userInfo.status){
    if(userInfo.result){
      const creatorUserId = userInfo.info.id;
      const result = await postService.createInfo(title, content, creatorUserId);
    
      if(result.code == 201){
        res.status(201).send({result: true, insertedId: result.insertedId});
      }else{
        res.status(500).send({result: false, message: result.result.error.message});
      }
    
    }else{
      res.status(404).send({result: false, message: "사용자 정보가 없습니다."});
    }
  }else{
    res.status(500).send({result: false, message: userInfo.error.message});
  }

  next();
});

// 게시물 목록 조회
router.get('/', async (req, res) => {

  const {page, limit} = req.query;
  const result = await postService.getList(page, limit);

  if(result.code == 200){
    res.status(200).send({result: true, totalCount: result.result.totalCount, hasNextPage: result.result.hasNextPage, list: result.result.list});
  }else{
    res.status(500).send({result: false, message: result.result.error.message});
  }
  next();
});

//게시물 정보 요청
router.get('/:id', async (req, res) => {

  const {id} = req.params;
  const result = await postService.getInfo(id);

  if(result.code == 200){
    res.status(200).send({result: true, info: result.result.info});
  }else{
    res.status(500).send({result: false, message: result.result.error.message});
  }
  next();
});

//게시물 수정 요청
router.put('/:id', async (req, res) => {

  const {id} = req.params;
  const {title, content} = req.body;

  let authHeader = req.headers.authorization;
  let token = authHeader && authHeader.split(" ")[1];

  const userInfo = await authModel.getUserId(token);
  if(userInfo.status){
    if(userInfo.result){

      const creatorUserId = await postModel.getCreatorUserId(id);
      if(creatorUserId.status){
        if(userInfo.info.id == creatorUserId.info.creatorUserId){
          const result = await postService.updateInfo(id, title, content);

          if(result.status){
            res.status(200).send({result: true});
          }else{
            res.status(500).send({result: false, message: result.error.message});
          }
        
        }else{
          res.status(401).send({result: false, message: "게시물을 생성한 사람만 수정할 수 있습니다."})
        }
      }else{
        res.status(404).send({result: false, message: "잘못된 id 입니다."})
      }
    }else{
      res.status(401).send({result: false, message: "게시물을 생성한 사람만 수정할 수 있습니다."})
    }
  }else{
    res.status(500).send({result: false, message: result.error.message});
  }


  next();
});

//게시물 삭제 요청
router.delete('/:id', async (req, res) => {

  const {id} = req.params;

  let authHeader = req.headers.authorization;
  let token = authHeader && authHeader.split(" ")[1];

  const userInfo = await authModel.getUserId(token);
  if(userInfo.status){
    if(userInfo.result){
      const creatorUserId = await postModel.getCreatorUserId(id);
      if(creatorUserId.status){
        if(userInfo.info.id == creatorUserId.info.creatorUserId){
          const result = await postService.deleteInfo(id);

          if(result.status){
            res.status(200).send({result: true});
          }else{
            res.status(500).send({result: false, message: result.error.message});
          }
                

        }else{
          res.status(401).send({result: false, message: "게시물을 생성한 사람만 삭제할 수 있습니다."});
        }
      }else{
        res.status(500).send({result: false, message: creatorUserId.error.message});
      }
    }else{
      res.status(401).send({result: false, message: "게시물을 생성한 사람만 삭제할 수 있습니다."});
    }
  }else{
    res.status(500).send({result: false,message: result.error.message});
  }

  next();
});


module.exports = router;