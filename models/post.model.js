const dbManager = require('../db/manager.db')

// 게시물 생성
module.exports.createInfo = async (title, content, creatorUserId) => {
    console.log("post.model::createPost")
    

    const query = `
        INSERT INTO wanted_pre.posts
            (title, content, creatorUserId)
        VALUES
            ("${title}", "${content}", ${creatorUserId})
            
        `
        
    const result = await dbManager.getConnection(query)
    console.log("post.model::login", result)

    return result;  
}

module.exports.getCount = async _ => {
  console.log("post.model::getCount")
  
  let query = `
      SELECT
        COUNT(*) AS cnt
      FROM
        wanted_pre.posts 
      WHERE
        isRemoved = 0
      `
      

  console.log("query", query)

  const result = await dbManager.getConnection(query)
  console.log("post.model::getList", result)
  
  return result;  
}

// 게시물 목록 요청
module.exports.getList = async (offset, limit) => {
  console.log("post.model::getList")
  
  let query = `
      SELECT
        id, title, content
      FROM
        wanted_pre.posts 
      WHERE
        isRemoved = 0
      LIMIT
        ${offset}, ${limit}

      `
      

  console.log("query", query)

  const result = await dbManager.getConnection(query)
  console.log("post.model::getList", result)
  result.list = [];
  const rows = result.rows
  console.log("rows", rows)
  
  rows.map(row => {
      result.list.push({
          id: row.id,
          title: row.title,
          content: row.content
      })
  })
  
  return result;  
}

// 게시물 정보 요청
module.exports.getInfo = async id => {
  console.log("post.model::getInfo", id)
  
  const query = `
      SELECT
        id, title, content 
      FROM
        wanted_pre.posts
      WHERE
        id = ${id}
      `

  const result = await dbManager.getConnection(query)
  console.log("post.model::getInfo", result)
  const row = result.rows[0]
  result.info = {
      id: row.id,
      title: row.title,
      content: row.content,
  }
  
  return result;  
}

// 게시물 수정 요청
module.exports.updateInfo = async (id, title, content) => {
  console.log("post.model::updateInfo", id, title, content);
  
  const query = `
      UPDATE wanted_pre.posts
      SET 
        title = "${title}",
        content = "${content}"
      WHERE
        id = ${id}
      `

  const result = await dbManager.getConnection(query)
  console.log("post.model::updateInfo", result)
  
  return result;  
}

// 게시물 삭제 요청
module.exports.deleteInfo = async id => {
  console.log("post.model::deleteInfo", id);
  
  const query = `
      UPDATE wanted_pre.posts
      SET 
        isRemoved = 1
      WHERE
        id = ${id}
      `

  const result = await dbManager.getConnection(query)
  console.log("post.model::deleteInfo", result)
  
  return result;  
}

// 생성자 아이디 가져오기.
module.exports.getCreatorUserId = async id => {
  console.log("auth.model::getCreatorUserId", id)
  
  const query = `
      SELECT
        creatorUserId
      FROM
        wanted_pre.posts
      WHERE
        id = ${id}
      `

  const result = await dbManager.getConnection(query)
  console.log("auth.model::getUserId", result)
  
  if(result.status){
      if(result.rows < 1){
        result.result = false;
      }else{
        const row = result.rows[0]
        result.info = {
          creatorUserId: row.creatorUserId,
        }
        result.result = true;
      }
  }

  return result;  
}