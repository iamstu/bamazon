var mysql = require("mysql");
var inquire = require("inquirer");
var purchaseId = "";
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

function validateQty(qty){
    if (parseInt(qty) != NaN && 0 < parseInt(qty))
        {return true}
    else{console.log("\nYou're fired. Notify the drone restocking team that your station is ready for a replacement or your fired.")
        return false}
}

connection.connect(function(err){
    if (err) throw err;
    console.log(connection.threadId);
    initManager();
})

function initManager(){
    inquire.prompt([{
        type: "list",
        message: "Select an action or you're fired.",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
        name: "initAction"
    }]).then(function(res){
        switch(res.initAction) {
            case "View Products for Sale":
                return productDisplay();
            case "View Low Inventory":
                return lowDisplay();
            case "Add to Inventory":
                return inventory();
            case "Add New Product":
                return newStock();
        }
    })
}

function productDisplay(){
    connection.query("select * from products", function(err, res){
        // console.log(res);
        if (err) throw err;
        for (var i = 0; i < res.length; i++){
            console.log(
                res[i].item_id  + "." +
                res[i].product_name + "\n$" +
                res[i].price + "\n" +
                res[i].stock_quantity + " Left in stock" +
                "\n----------------------------------\n" );

        }
    initManager()
        
    })
}

function lowDisplay(){
    connection.query("select * from products WHERE stock_quantity < 5", function(err, res){
        // console.log(res);
        if (err) throw err;
        console.log("Restock the following products or you're fired.")
        for (var i = 0; i < res.length; i++){
            console.log(
                res[i].item_id + "." +
                res[i].product_name + "\n$" +
                res[i].price + "\n" +
                res[i].stock_quantity + " Left in stock" +
                 "\n----------------------------------\n" );
        }
    initManager()        
    })
}

function inventory(){
    // productDisplay();
    inquire.prompt([{
        type: "input",
        message: "What is the Id of the item are you going to restock?",
        name: "id"
    },{
        type: "input", 
        message: "How many are you adding to inventory?",
        name: "quantity",
        validate: validateQty
        }]).then(function(response){
        var item = parseInt(response.id);
        var num = parseInt(response.quantity);
            connection.query("UPDATE products SET stock_quantity = stock_quantity + " + num + " WHERE item_id =" + item
            ,function(err, res){
                if (err) throw err;
                initManager();
            });
            
    })
}

function newStock(){
    inquire.prompt([{
        type: "input",
        message: "What is the name of the product",
        name: "name"
    },{
        type: "input",
        message: "What is the name of the department",
        name: "dep"
    },{
        type: "input",
        message: "What is the price of the product",
        name: "price",
        validate: validateQty
    },{
        type: "input",
        message: "How many are you stocking",
        name: "qty",
        validate: validateQty
    }]).then(function(res){
        connection.query("INSERT INTO products SET ?", 
            {
                product_name: res.name,
                department_name: res.dep,
                price: parseFloat(res.price),
                stock_quantity: parseInt(res.qty)
            },
        function(response){
            initManager();
        })
    })
}