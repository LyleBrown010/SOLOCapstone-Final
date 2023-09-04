const db = require('../config')

class Products{
    fetchProducts(req, res){
        const query = `SELECT prodID, productName, productDescription, productPrice, category, productUrl, artistName FROM Products;`;

        db.query(query, (err, results) => {
            if(err) throw err;

            res.json({
                status: res.statusCode, 
                results
            });
        });
    }

    fetchProduct(req, res){
        const query = `SELECT prodID, productName, productDescription, productPrice, category, productUrl, artistName FROM Products WHERE prodID = '${req.params.id}';`;

        db.query(query, (err, result) => {
            if(err) throw err;

            res.json({
                status: res.statusCode, 
                result
            });
        });
    }

    addProduct(req, res) {
        const query = `
        INSERT INTO Products 
        SET ?;`;
    
        db.query(query, req.body, (err) => {
          if (err) throw err;
    
          res.json({
            status: res.statusCode,
            message: "Added a new Product",
          });
        });
    }

    updateProduct(req, res) {
        const query = `
        UPDATE Products 
        SET ? 
        WHERE prodID = ?;`;
    
        db.query(query, [req.body, req.params.id], (err) => {
          if (err) throw err;
    
          res.json({
            status: res.statusCode,
            message: "Product has been updated",
          });
        });
    }

    deleteProduct(req, res) {
        const query = `
        DELETE FROM Products
        WHERE prodID = "${req.params.id}";`;
    
        db.query(query, (err) => {
          if (err) throw err;
    
          res.json({
            status: res.statusCode,
            message: "Product has been removed",
          });
        });
    }
    
}

module.exports = Products;