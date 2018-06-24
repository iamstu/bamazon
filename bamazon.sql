drop database if exists bamazon;

create database bamazon;

use bamazon;

create table products(
item_id int not null auto_increment,
product_name varchar(45) null,
department_name varchar(45) null,
price float null,
stock_quantity int null,
primary key (item_id)
);



insert into products(product_name, department_name, price, stock_quantity)
value ("Dog food", "Pet supplies", 78.99, 20), ("Chew toys", "Pet supplies", 12.00, 200),
 ("Books", "Entertainment", 40.99, 60), ("Movies", "Entertainment", 25.00, 45),
 ("Bikes!", "Exercise", 120.00, 70), ("Weights", "Exercise", 32.99, 35),
 ("Yoga mat", "Exercise", 34.99, 25), ("Shoes", "Apparel", 68.99, 60),
 ("Existential Dread", "Reality", 0.00, 5000000), ("Relief from Existential Dread", "Reality", 500000, 1);
 
 select * from products;