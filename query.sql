-- table creation in supermarket database
CREATE TABLE item_purchase (
    purchase_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    items_code VARCHAR(255) NOT NULL items VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    total_kg INT(10) NOT NULL,
    per_kg INT(10) NOT NULL,
    total_kg_amount INT NOT NULL
);

CREATE TABLE item_sales (
    sales_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    items_code VARCHAR(255) NOT NULL,
    items VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    item_kg INT NOT NULL,
    per_item_amt INT(10) NOT NULL,
    total_item_amt INT(10) NOT NULL,
    balance_kg INT,
);

CREATE TABLE price_details (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    items_code VARCHAR(255) NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    amount INT NOT NULL,
    date DATE
);

-- update
UPDATE
    item_purchase
SET
    total_kg_amount = per_kg * total_kg;

-- insert into
INSERT INTO
    item_purchase(items, category, total_kg, per_kg, items_code)
VALUES
    ("rice", 'ponni', 100, 30, 'IT001');



-- to update balance_kg column and total_kg columns
DELIMITER $$
CREATE PROCEDURE get_data (
	items_code VARCHAR(255),
    items VARCHAR(255),
	category VARCHAR(255),
	item_kg INT,
	per_item_amt INT
)
BEGIN
    DECLARE balance_kg INT;
    SELECT total_kg into balance_kg FROM item_purchase AS a WHERE a.items=items;
	UPDATE item_purchase AS c SET c.total_kg=(balance_kg - item_kg) WHERE c.items=items;
    INSERT INTO item_sales(items_code, items, category, item_kg, per_item_amt, total_item_amt, balance_kg ) VALUES 
        (items_code,items,category,item_kg,per_item_amt,(item_kg * per_item_amt),(balance_kg - item_kg));

END $$
DELIMITER ; 

call get_data('IT001','rice','ponni','100','30' );

/*

to change date and amount automaticaly update

*/

DELIMITER $$
CREATE  PROCEDURE get_datas (
	itemsCode VARCHAR(255),
    items VARCHAR(255),
	category VARCHAR(255),
	item_kg INT
    
)
BEGIN
    DECLARE balance_kg INT;
    DECLARE per_item_amount INT;
    
    SELECT amount into per_item_amount FROM price_details AS pd where pd.items_code=itemsCode AND pd.pricedate=(SELECT CURRENT_DATE()) ORDER BY id DESC LIMIT 1;
    SELECT total_kg into balance_kg FROM item_purchase AS a WHERE a.items=items;
	UPDATE item_purchase AS c SET c.total_kg=(balance_kg - item_kg) WHERE c.items=items;
    INSERT INTO item_sales(items_code, items, category, item_kg, per_item_amt, total_item_amt, balance_kg ) VALUES 
        (itemsCode,items,category,item_kg,per_item_amount,(item_kg * per_item_amount),(balance_kg - item_kg));

END $$
DELIMITER ; 

drop procedure get_datas;
call get_datas('IT001','rice','ponni','2');


SELECT items_code, ((SELECT total_kg FROM item_purchase WHERE items="rice" order by purchase_id desc limit 1) - 12) as balancer
FROM  item_sales;