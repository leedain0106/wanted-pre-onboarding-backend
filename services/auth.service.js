const authModel = require('../models/auth.model')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const secretKey = require("../config/jwtkey.config").secretKey;


// 회원가입
module.exports.signup = async (email, password) => {
  console.log("auth.service::signup", email, password)
  
  // 유효성 검사
  if (email == undefined){
    return {code: 400, message: "이메일이 필요합니다."}
  }
  if (email.indexOf('@') == -1){
    return {code: 400, message: "이메일 형식이 아닙니다."}
  }
  if (password == undefined){
    return {code: 400, message: "비밀번호가 필요합니다."}
  }
  if (password.length < 8){
    return {code: 400, message: "비밀번호는 8자리 이상이여야 합니다."}
  }

  const hash = await bcrypt.hash(password, 12);

  const result = await authModel.signup(email, hash);
  
  if(result.status){
      return {code: 201, result: result}
  }else{
      return {code: 500, result: result}
  }
}

// 로그인
module.exports.login = async (email, password) => {
  console.log("auth.service::login", email, password)

  // 유효성 검사
  if (email == undefined){
    return {code: 400, message: "이메일이 필요합니다."}
  }
  if (email.indexOf('@') == -1){
    return {code: 400, message: "이메일 형식이 아닙니다."}
  }
  if (password == undefined){
    return {code: 400, message: "비밀번호가 필요합니다."}
  }
  if (password.length < 8){
    return {code: 400, message: "비밀번호는 8자리 이상이여야 합니다."}
  }
  
  
  const result = await authModel.login(email, password)

  
  if(result.status){
      if(result.result){
          
          // 토큰 생성
          const accessToken = await jwt.sign({email}, secretKey, {expiresIn: "180days"});
          
          const resultUpdateToken = await authModel.updateToken(email, accessToken);
          if(resultUpdateToken.status){
                  result.accessToken = accessToken;
                  return {code: 200, result: result};
          }else{
            return {code: 500, result: result};
          }
          
      }else{
          return {code: 401, message: "존재하지 않는 계정입니다."};
      }
  }else{
    return {code: 500, result: result};
  }
}



