var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'pearlhacksdb.ceu4krrvdcqb.us-east-2.rds.amazonaws.com',
  user     : 'pearlhacksDB',
  password : '2018pearlhacks',
  database : 'users'
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});
exports.register = function(req,res){
  // console.log("req",req.body);
  var users={
    "phone_number":req.body.phone_number,
    "password":req.body.password,
  }
  connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    console.log('The solution is: ', results);
    res.send({
      "code":200,
      "success":"user registered sucessfully"
        });
  }
  });
}
exports.login = function(req,res){
  var phone_number= req.body.phone_number;
  var password = req.body.password;
  connection.query('SELECT * FROM users WHERE phone_number = ?',[phone_number], function (error, results, fields) {
  if (error) {
    // console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    // console.log('The solution is: ', results);
    if(results.length >0){
      if([0].password == password){
        res.send({
          "code":200,
          "success":"login sucessfull"
            });
      }
      else{
        res.send({
          "code":204,
          "success":"phone and password does not match"
            });
      }
    }
    else{
      res.send({
        "code":204,
        "success":"phone does not exits"
          });
    }
  }
  });
}
