const postModel = require('../models/post.model')
const paginationHelper = require('../helpers/pagination.helper')

module.exports.createInfo = async (title, content, creatorUserId) => {
  console.log("post.service::createPost", title, content,creatorUserId)
    

  // 게시물 저장
  const result = await postModel.createInfo(title, content, creatorUserId)
  if(result.status){
    return {code: 201, insertedId: result.rows.insertId};
  }else{
    return {code: 500, result: result};
  }
}

// 목록 요청
module.exports.getList = async (page, limit) => {
  console.log("post.service::getList")
  
  limit = Math.round(limit ? limit : 10);
  const offset = paginationHelper.makeOffset(page, limit);

  const countResult = await postModel.getCount();
  const totalCount = countResult.rows[0].cnt;

  const hasNextPage = paginationHelper.checkHasNextPage(totalCount, offset, limit);
  
  const result = await postModel.getList(offset, limit);
  result.totalCount = totalCount;
  result.hasNextPage = hasNextPage;
  if(result.status){
    return {code: 200, result: result};
  }else{
    return {code: 500, result: result};
  }
}

// 정보 요청
module.exports.getInfo = async id => {
  console.log("post.service::getInfo")
  
  
  const result = await postModel.getInfo(id);
  console.log("result", result)

  if(result.status){
    return {code: 200, result: result};
  }else{
    return {code: 500, result: result};
  }
}

// 수정 요청
module.exports.updateInfo = async (id, title, content) => {
  console.log("post.service::updateInfo")
  
  
  const result = await postModel.updateInfo(id, title, content);
  console.log("result", result)
  
  return result;
}

// 삭제 요청
module.exports.deleteInfo = async id => {
  console.log("post.service::deleteInfo")
  
  
  const result = await postModel.deleteInfo(id);
  console.log("result", result)
  
  return result;
}