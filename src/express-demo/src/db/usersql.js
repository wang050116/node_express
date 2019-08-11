var UserSQL = {  
  insert:'INSERT INTO users(id,name) VALUES(?,?)', 
  queryAll:'SELECT * FROM users',  
  getUserById:'SELECT * FROM users WHERE id = ? ',
};
module.exports = UserSQL;