const express = require("express");
const router = express.Router();
const writesql = require("../config/writesql");
const readsql = require("../config/readsql");

router.post("/insert", (req, res) => {
  let items_code = req.body.items_code;
  let items = req.body.items;
  let category = req.body.category;
  let total_kg = req.body.total_kg;
  let per_kg = req.body.per_kg;
  let total_kg_amount = req.body.total_kg_amount;
  var query = `INSERT INTO item_purchase(items_code, items, category, total_kg, per_kg,total_kg_amount ) VALUES 
  ('${items_code}','${items}','${category}','${total_kg}','${per_kg}',('${per_kg}'*'${total_kg}'))`;
  writesql.query(query, (error, results, fields) => {
    if (error) res.send(error);
    res.send("data inserted successfully");
  });
});

// ehuehuwqo

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
