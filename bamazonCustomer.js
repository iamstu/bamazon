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

var productsArr = [];
connection.connect(function(err){
    if (err) throw err;
    console.log(connection.threadId);
    initCustomer();
})

function initCustomer(){
    connection.query("select * from products", function(err, res){
        // console.log(res);
        if (err) throw err;
        for (var i = 0; i < res.length; i++){
        productsArr.push({
            id: res[i].item_id,
            name: res[i].product_name,
            price: res[i].price,
            qty: res[i].stock_quantity
        });

    }
        console.log(productsArr.length);   
        customer();
    })
       
}

function validateId(selection){
    if (selection === "quit" || parseInt(selection) != NaN && 0 < parseInt(selection) && parseInt(selection) <= productsArr.length)
        {return true}
    else{return false}

}

function validateQty(selection){
    if (parseInt(selection) != NaN && 0 < parseInt(selection) && parseInt(selection) <= productsArr[(purchaseId - 1)].qty )
        {return true}
    else{return false}

}

function customer(){
    for (var i = 0; i < productsArr.length; i++){
    console.log(
        productsArr[i].id + "." +
        productsArr[i].name + "\n$" +
        productsArr[i].price + "\n" +
        productsArr[i].qty + " left in stock" +
         "\n----------------------------------\n" );
    }
    inquire.prompt([{
        type: "input",
        message: "What is the number of the item would you like to buy? (enter 'quit' to exit)",
        name: "selection", 
        validate: validateId
    }
    ]).then(function(res){
        if (res.selection === "quit"){
            connection.end();
        }else{
        purchaseId = res.selection;
        purchase(purchaseId);
        // console.log(purchaseId);
    }})
};

function purchase(selectedId){
    inquire.prompt([{
        type: "input",
        message: "How many?",
        name: "selection",
        validate: validateQty

    }]).then(function(res){
        var reqQty = res.selection;
        connection.query("UPDATE products SET stock_quantity = stock_quantity -" +  reqQty + " WHERE item_id =" + selectedId 
        ,function(err, res){
            console.log("Total: $" + parseFloat(productsArr[(purchaseId-1)].price) * parseFloat(reqQty));
            productsArr[(purchaseId-1)].qty -= reqQty;
            inquire.prompt([{
                type: "confirm",
                message: "Would you like to make another purchase?",
                name: "continue"
            }]).then(function(res){
                if (res.continue){
                    customer();
                }else{connection.end()}
            })
        })
    })

}