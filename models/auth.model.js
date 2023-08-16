const dbManager = require('../db/manager.db')
const bcrypt = require("bcrypt");
 
// 회원가입
module.exports.signup = async (email, password) => {
    console.log("auth.model::signup")
    
    const query = `
        INSERT INTO wanted_pre.users
            (email, password)
        VALUES
            ("${email}", "${password}")
            
        `
        
    const result = await dbManager.getConnection(query)
    console.log("auth.model::login", result)

    return result;  
}

// 로그인
module.exports.login = async (email, password) => {
  console.log("auth.model::checkPassword", email, password)
  
  const query = `
      SELECT
        password
      FROM
        wanted_pre.users
      WHERE
        email = "${email}"
      `

  const result = await dbManager.getConnection(query)
  console.log("auth.model::getUserId", result)
  
  if(result.status){
    if(result.rows.length < 1){
      result.result = false;      
    }else{
      const hash = result.rows[0].password;
      const check = await bcrypt.compare(password, hash);
      if (check){
        result.result = true;
      }else{
        result.result = false;
      }
    }
  }

  return result;  
}


// 토큰 업데이트
module.exports.updateToken = async (email, token) => {
  console.log("auth.model::updateToken");
  
  const query = `
  UPDATE 
      wanted_pre.users
  SET
      token = "${token}"
  WHERE
      email = "${email}"
  `
  
  const result = await dbManager.getConnection(query);
  console.log("토큰 업데이트 결과", result);
  return result;

}



// 아이디 가져오기.
module.exports.getUserId = async token => {
  console.log("auth.model::getUserId", token)
  
  const query = `
      SELECT
        id
      FROM
        wanted_pre.users
      WHERE
        token = "${token}"
      `

  const result = await dbManager.getConnection(query)
  console.log("auth.model::getUserId", result)
  
  if(result.status){
      if(result.rows < 1){
        result.result = false;
      }else{
        const row = result.rows[0]
        result.info = {
          id: row.id,
        }
        result.result = true;
      }
  }else{
    result.result = false;
  }

  return result;  
}

