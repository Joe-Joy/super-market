const express = require("express");
const cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const item_purchase = require("./routes/item_purchase");
const item_sales = require("./routes/item_sales");
const price_details = require("./routes/price_details");
const index = require("./routes/index");
const item_purchase_sub = require("./routes/item_purchase_sub");

app.use("/", index);
app.use("/item_purchase", item_purchase);
app.use("/item_sales", item_sales);
app.use("/price_details", price_details);
app.use("/item_purchase_sub", item_purchase_sub);


const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
