const express = require("express");
const router = express.Router();
const writesql = require("../config/writesql");
const readsql = require("../config/readsql");

router.post("/insert", (req, res) => {
  let items_code_sub = req.body.items_code_sub;
  let items = req.body.items;
  let category = req.body.category;
  let total_kg = req.body.total_kg;
  let per_kg_amount = req.body.per_kg_amount;
  var query = `INSERT INTO item_purchase_sub(items_code_sub, items, category, total_kg, per_kg_amount,total_kg_amount ) VALUES 
  ('${items_code_sub}','${items}','${category}','${total_kg}','${per_kg_amount}',('${per_kg_amount}'*'${total_kg}'))`;
  writesql.query(query, (error, results, fields) => {
    if (error) res.send(error);
    res.send("data inserted successfully");
  });
});

router.get("/one", (req, res) => {
  var query = `SELECT a.items_code, b.items_code_sub, b.category FROM item_purchase AS a
                  INNER JOIN item_purchase_sub AS b ON a.items = b.items`;
  readsql.query(query, (error, results, fields) => {
    if (error) res.send(error);
    res.send(results);
  });
});

router.get("/two", (req, res) => {
    var query = `SELECT * FROM item_purchase_sub`;
    readsql.query(query, (error, results, fields) => {
      if (error) res.send(error);
      console.log(results);
      res.end(JSON.stringify(results));
    });
  });
  
module.exports = router;