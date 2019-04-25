var express = require('express');
var router = express.Router();
const SqlRunner = require('../db/sql_runner');

router.get('/', function(req, res){
  SqlRunner.run('SELECT * FROM books').then(result => {
    res.status(200).json(result.rows);
  });
});

// router.delete('/:id', function(req, res){
//   SqlRunner.run("DELETE FROM books WHERE id = $1", [req.params.id])
//     .then((result) => {
//       res.status(200).json(result);
//     });
// });

router.delete('/title/:title', function(req, res){
  console.log(req.params.title);
  SqlRunner.run("DELETE FROM books WHERE title = $1", [req.params.title])
  .then(result => {
    SqlRunner.run("SELECT * FROM books ORDER BY title ASC").then(result => {
      res.status(201).json(result.rows)
    });
  });
});

router.put('/:id', function(req, res){
  console.log(req.params);
  SqlRunner.run(
    "UPDATE books SET title=$1, publication_date=$2, main_character=$3 WHERE id=$4",
    [req.body.title, req.body.publication_date, req.body.main_character, req.params.id]
  ).then(result => {
    SqlRunner.run("SELECT * FROM books ORDER BY title ASC").then(result => {
      res.status(201).json(result.rows);
    });
  });
})


router.post("/", function(req, res) {
  SqlRunner.run(
    "INSERT INTO books (title, publication_date, main_character) VALUES ($1, $2, $3)",
    [req.body.title, req.body.publication_date, req.body.main_character]
  ).then(result => {
    SqlRunner.run("SELECT * FROM books ORDER BY title ASC").then(result => {
      res.status(201).json(result.rows);
    });
  });
});

module.exports = router;
