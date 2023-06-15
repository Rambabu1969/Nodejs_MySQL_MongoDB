//npm install express -----------
var express = require('express');
var app = express();

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Default Route ------------------
app.get('/', function (req, res) {
  res.send('<h1>Hello World</h1>');
})
    
// working with MySQL Database ----------------
// npm install mysql
var mysql = require('mysql')

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'mysql',
    database:'grocery_store'
  });
  
app.get("/mysql/products", function(req , res){
    connection.query("SELECT * FROM grocery_store.products", function (err, data) {
      if (err) return next(new AppError(err, 500));
      res.send(data);
    });
});

//working with MongoDB ---------------
// npm install mongodb, mongoose
var mongoose = require('mongoose');

app.get("/mongodb/customers", function(req , res){

   mongoose.connect('mongodb://127.0.0.1:27017/mru').then(() => console.log('Connected!'));
   const db = mongoose.connection;

  db.collection("customers").findOne({}, function(err, result) {
    if (err) throw err;
    console.log(result);

    db.close();

    res.send(result);
  });

}); 

// Run App: node index.js
// Test URL: http://127.0.0.1:8080
// Test URL: http://127.0.0.1:8080/mysql/products
// Test URL: http://127.0.0.1:8080/mongodb/customers
