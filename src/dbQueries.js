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
    let updateQuery = "SELECT * from shop_details WHERE shope_id=?";
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
