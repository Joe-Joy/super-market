const express = require("express");
const router = express.Router();
const writesql = require("../config/writesql");
const readsql = require("../config/readsql");

router.post("/insert", (req, res) => {
  let items_code = req.body.items_code;
  let items = req.body.items;
  let total_kg = req.body.total_kg;
  let per_kg_amount = req.body.per_kg_amount;
  let total_kg_amount = req.body.total_kg_amount;
  var query = `INSERT INTO item_purchase(items_code, items, total_kg, per_kg_amount,total_kg_amount ) VALUES 
  ('${items_code}','${items}','${total_kg}','${per_kg_amount}',('${per_kg_amount}'*'${total_kg}'))`;
  writesql.query(query, (error, results, fields) => {
    if (error) res.send(error);
    res.send("data inserted successfully");
  });
});


// router.post('/insert',  (req, res) => {
//   var postData = req.body;
//   var query = "INSERT INTO item_purchase SET ?"
//   writesql.query(query,
//   postData, (error, results, fields) => {
//     if (error) throw error;
//     res.end('data inserted successfully');
//   });
// });

router.get("/", (req, res) => {
  var query = `SELECT * FROM item_purchase`;
  readsql.query(query, (error, results, fields) => {
    if (error) res.send(error);
    res.end(JSON.stringify(results));
  });
});

module.exports = router;
