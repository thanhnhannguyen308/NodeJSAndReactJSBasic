var express = require('express');
var router = express.Router();
const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'QLBH',
  password: '123456',
  port: 5432,
})


/* GET home page. */
router.get('/', function(req, res, next) {

  pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
  })
  res.render('index', { title: 'Express' });
});

router.get('/getdata', function(req, res, next) {

  pool.query('SELECT * FROM product', (err, kq) => {
    if(err){
      console.log('Da xuat hien loi:');
      console.log(err);
    }else{
      console.log('Da xuat ra kq: ')
      console.log(kq.rows);
      res.send(kq.rows);
    }
    // pool.end()
  })
  // res.render('index', { title: 'Express' });
});


/* GET home page. */
router.get('/add', function(req, res, next) {
  res.render('add', { title: 'adddata' });
});

router.post('/add', function(req, res, next) {
  var name = req.body.name;
  var price = req.body.price;
  var image = req.body.image;
  pool.query('INSERT INTO product(name,price,image) VALUES ($1, $2, $3)', [name, price, image], (err,response) => {
    if(err) {
      res.send(err + 'name: ' + name);
    }
    else{
      res.send('Da them du lieu thanh cong ' + name + price + image);
    }
    
  })
});

module.exports = router;
