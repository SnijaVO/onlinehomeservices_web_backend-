import mysql from "mysql";
import { dataBase } from "./dbConnection.js";

export const getLocations = () => {
  return new Promise((resolve) => {
    let updateQuery = "SELECT id,name from location";
    let query = mysql.format(updateQuery);

    dataBase.query(query, (err, response) => {
      if (err) {
        console.error(" getLocations error", err);
        resolve([]);
      } else {
        resolve(response);
      }
    });
  });
};

export const getProducts = () => {
  return new Promise((resolve) => {
    let updateQuery = "SELECT id,name from product";
    let query = mysql.format(updateQuery);

    dataBase.query(query, (err, response) => {
      if (err) {
        console.error(" getProducts error", err);
        resolve([]);
      } else {
        resolve(response);
      }
    });
  });
};

export const getShops = (locationId, productId) => {
  return new Promise((resolve) => {
    let updateQuery = "SELECT * from shop WHERE location_id=?";
    let query = mysql.format(updateQuery, [locationId]);

    dataBase.query(query, (err, response) => {
      if (err) {
        console.error(" getShops error", err);
        resolve([]);
      } else {
        resolve(response);
      }
    });
  });
};

export const getShopDetail = (shopId) => {
  return new Promise((resolve) => {
    let updateQuery = "SELECT * from shop WHERE id=?";
    let query = mysql.format(updateQuery, [shopId]);

    dataBase.query(query, (err, response) => {
      if (err) {
        console.error(" getShopDetail error", err);
        resolve(null);
      } else {
        resolve(response);
      }
    });
  });
};

export const getShopProducts = (shopId) => {
  return new Promise((resolve) => {
    let updateQuery = "SELECT * from shop_products WHERE shope_id=?";
    let query = mysql.format(updateQuery, [shopId]);

    dataBase.query(query, (err, response) => {
      if (err) {
        console.error(" getShopProduct error", err);
        resolve([]);
      } else {
        resolve(response);
      }
    });
  });
};

export const findShopWithEmailOrPhone = (email, phone) => {
  return new Promise((resolve) => {
    let updateQuery = "SELECT * from shop WHERE email=? OR phone=?";
    let query = mysql.format(updateQuery, [email, phone]);

    dataBase.query(query, (err, response) => {
      if (err) {
        console.error(" getShops error", err);
        resolve(null);
      } else {
        resolve(response);
      }
    });
  });
};

export const findShopWithEmailAndPassword = (email, password) => {
  return new Promise((resolve) => {
    let updateQuery = "SELECT id,name from shop WHERE email=? AND password=?";
    let query = mysql.format(updateQuery, [email, password]);

    dataBase.query(query, (err, response) => {
      if (err) {
        console.error(" getShops error", err);
        resolve(null);
      } else {
        resolve(response);
      }
    });
  });
};

export const addShop = async (
  email,
  name,
  phoneNumber,
  location,
  address,
  locationName
) => {
  return new Promise((resolve, reject) => {
    let updateQuery =
      "INSERT INTO shop SET email = ? ,name = ?, phone=?, location_id=?, address=?, password=?, location_name=?";
    let query = mysql.format(updateQuery, [
      email,
      name,
      phoneNumber,
      location,
      address,
      "temp123",
      locationName,
    ]);
    dataBase.query(query, (err, response) => {
      if (err) {
        console.error(" addShop error", err);
        resolve(0);
      } else {
        // console.log(' insertChatMessage success', response.affectedRows);
        resolve(1);
      }
      // rows updated
    });
  });
};

export const updateProducts = (shopId, products) => {
  /*
  shop_products
     `id` int NOT NULL AUTO_INCREMENT,
    `shope_id` int NOT NULL, 
    `product_id` int NOT NULL, 
    `status` tinyint(1) DEFAULT '0',
    `quantity` int DEFAULT 0,
    */

  const values = [];
  for (let productId in products) {
    values.push([
      shopId,
      parseInt(productId),
      products[productId].status ? 1 : 0,
      parseInt(products[productId].stock),
    ]);
  }

  return new Promise((resolve) => {
    dataBase.getConnection(function (err, connection) {
      connection.beginTransaction(function (err) {
        if (err) {
          //Transaction Error (Rollback and release connection)
          connection.rollback(function () {
            connection.release();
            resolve(0);
            //Failure
          });
        } else {
          //

          let deleteQuery = "DELETE from shop_products WHERE shope_id = ?";
          let dquery = mysql.format(deleteQuery, [shopId]);
          connection.query(dquery, (err, response) => {
            if (err) {
              connection.rollback(function () {
                connection.release();
                //Failure
              });
              resolve(0);
            } else {
              /// else
              let updateQuery =
                "INSERT INTO shop_products (shope_id,product_id,status,quantity) VALUES ?";

              let query = mysql.format(updateQuery, [values]);
              connection.query(query, (err, response) => {
                if (err) {
                  console.error(" updateProducts error", err);
                  connection.rollback(function () {
                    connection.release();
                    //Failure
                  });
                  resolve(0);
                } else {
                  // console.log(' setBakerUnavialableDates success ');
                  connection.commit(function (err) {
                    if (err) {
                      connection.rollback(function () {
                        connection.release();
                        resolve(0);
                        //Failure
                      });
                    } else {
                      connection.release();
                      resolve(1);
                      //Success
                    }
                  });
                }
              });
            }
          });
        }
      });
    });

    ////current code

    // dataBase.query(query, (err, response) => {
    //   if (err) {
    //     console.error(" updateProducts error", err);
    //     resolve(0);
    //   } else {
    //     resolve(1);
    //   }
    // });
  });
};
