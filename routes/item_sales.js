const express = require("express");
const router = express.Router();
const writesql = require("../config/writesql");
const readsql = require("../config/readsql");

router.post("/insert", (req, res) => {
  let items_code = req.body.items_code;
  let items = req.body.items;
  let category = req.body.category;
  let item_kg = req.body.item_kg;
  let per_item_amt = req.body.per_item_amt;
  queryOne = `call get_data('${items_code}','${items}','${category}','${item_kg}','${per_item_amt}')`;
  writesql.query(queryOne, (error, results, fields) => {
    if (error) throw error;
    res.send(results);
  });
});

router.post("/inserts", (req, res) => {
  let items_code = req.body.items_code;
  let items = req.body.items;
  let category = req.body.category;
  let item_kg = req.body.item_kg;
  queryOne = `call get_datas('${items_code}','${items}','${category}','${item_kg}')`;
  writesql.query(queryOne, (error, results, fields) => {
    if (error) throw error;
    res.send(results);
  });
});
module.exports = router;

// ---------------------------three queries methods

// router.post("/inserts", (req, res) => {
//   let items_code = req.body.items_code;
//   let items = req.body.items;
//   let category = req.body.category;
//   let item_kg = req.body.item_kg;
//   let date = "2020-12-25";
//   let query = `SELECT amount FROM price_details WHERE items_code='${items_code}' AND date ='${date}'`;
//   readsql.query(query, (error, results, fields) => {
//     if (error) console.log(error);
//     let per_item_amt = results[0].amount;
//     let queryTwo = `SELECT total_kg FROM item_purchase AS a WHERE a.items='${items}'`;
//     readsql.query(queryTwo, (error, resultsOne, fields) => {
//       if (error) console.log(error);
//       let balance_kg = resultsOne[0].total_kg;
//       let queryOne = `INSERT INTO item_sales(items_code, items, category, item_kg, per_item_amt, total_item_amt, balance_kg ) VALUES ('${items_code}','${items}','${category}','${item_kg}','${per_item_amt}','${
//         item_kg * per_item_amt
//       }','${balance_kg - item_kg}')`;
//       writesql.query(queryOne, (error, resultsTwo, fields) => {
//         if (error) console.log(error);
//         res.send(resultsTwo);
//       });
//     });
//   });
// });