const express = require('express');
const mysql = require('mysql');

// create connection
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'gianinna',
  database : 'example'
});

db.connect(function(err) {
  if(err){
    throw err;
  };
  console.log('Mysql is connected');
});
const app = express();

// creating db
app.get('/createdb', function(req,res) {
  let sql = 'CREATE DATABASE example';
  db.query(sql, function(err, result) {
    if (err) throw err;
    console.log(result);
    res.send('Database created..');
  });
});
// create table
app.get('/createpoststable', function(req,res) {
  let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT,title VARCHAR(255),body VARCHAR(255), PRIMARY KEY (id))';
  db.query(sql, function(err, result) {
    if (err) throw err;
    console.log(result);
    res.send('Posts table created...')
  })
});

// Insert first post
app.get('/addpost1', (req, res) => {
  let post = {title: 'my first post', body: 'Hello today was a good day in indian river' };
  let sql = 'INSERT INTO SET ?';
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('first post addded...');
  });
});
// adding second post
app.get('/', (req, res) => {
  let post = {title: 'this is my home url', body: 'another one' };
  let sql = 'INSERT INTO posts SET ?';
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('second post addded...');
  });
});
// select Posts
app.get('/getposts', (req,res) => {
  let sql = 'SELECT * FROM posts;';
  db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send('fetching all posts...');
  });
});
// select a single
app.get('/getpost/:id', (req,res) => {
  let sql =`SELECT * FROM posts WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`fetching post...`);
  });
});
// update a post
app.get('/updatepost/:id', (req,res) => {
  let sql =`UPDATE posts SET title="updating post", body="body updated as well" WHERE id = ${req.params.id};`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`updating post...`);
  });
});
// delete a post
app.get('/deletepost/:id', (req,res) => {
  let sql =`DELETE FROM posts WHERE id = ${req.params.id};`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`deleting3 post...`);
  });
});

app.listen(3000);
console.log('you are listening to port 3000');
