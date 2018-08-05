# bamazon


This is an app made to run in node with MySQL. To run it run npm install and then copy the sql file and run it in the MySQL database.
Then you can run the customer or the manager versions of the app in node.js.

bamazon Customer:

First the app prints the list of products and asks the use to select an ID. When an ID is entered a quantity is requested. After the quantity is selected the total is shown for the purchase and the user is prompted to either make another purchase or quit the app. the quantity is removed from MySQL. 

![IMG of products and request](https://github.com/iamstu/bamazon/blob/master/images/cust-first.png)


Then if the customer choses to make another purchase the table with the new values will be printed and the app starts over.


bamazon Manager:

First the manager is prompted with the following choices:
* View products for sale. (shows all product)
* View low inventory. (shows oly products with quantity less than 5)
* Add to inventory. (increase quantity of existing products)
* Add new product. (adds new line in MySQL)

View products:

![IMG of products](https://github.com/iamstu/bamazon/blob/master/images/manager-second.png)

View low inventory:

![IMG of low products](https://github.com/iamstu/bamazon/blob/master/images/manager-third.png)

Add inventory:

![IMG of add inventory](https://github.com/iamstu/bamazon/blob/master/images/manager-fourth.png)

Add product:

![IMG of new product](https://github.com/iamstu/bamazon/blob/master/images/manager-fifth.png)

Technologies used: MySQL, Node.js, inquirer, JavaScript
