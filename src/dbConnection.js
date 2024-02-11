import mysql from "mysql";

export const dataBase = mysql.createPool({
  connectionLimit: 100, //important
  host: "localhost",
  port: 3306,
  user: "root",
  password: "localhost",
  database: "lifesupportfinder",
  debug: false,
});
