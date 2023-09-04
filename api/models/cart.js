const db = require('../config');

class Cart{
    fetchCart(req, res){
        const query = `
        SELECT productName, productPrice, productUrl FROM Users 
        INNER JOIN Cart ON Users.userID = Cart.userID
        INNER JOIN Products ON Cart.productID = Products.productID
        WHERE Cart.userID = ${req.params.id};`;

        db.query(query, (err, results) => {
            if(err) throw err; 
            res.json({
                status: res.StatusCode, 
                results
            })
        })
    }

    addToCart(req, res){
        const query = `
        INSERT INTO Cart
        SET?;`;

        db.query(query, req.body, (err) => {
            if(err){
                res.json({
                    status: res.StatusCode,
                    message: "Could not insert a new product"
                });
            }
            else{
                res.json({
                    status: res.statusCode,
                    message: "Successfully added new product"
                })
            }
        })
    }

    updateCart(req, res){
        const query = `
        Update Cart
        SET ?
        WHERE cartID = ?;`;

        db.query(query, [req.body, req.params.id], (err) => {
            if(err) throw err

            res.json({
                status: res.StatusCode, 
                message: "Cart has been updated"
            });
        });
    }

    deleteCart(req, res){
        const query = `
        DELETE FROM Cart
        WHERE cartID = ?;`;

        db.query(query, [req.params.id], (err) => {
            if (err) throw err;

            res.json({
                status: res.statusCode, 
                message: "Cart has been emptied"
            });
        });
    }
}    

module.exports = Cart