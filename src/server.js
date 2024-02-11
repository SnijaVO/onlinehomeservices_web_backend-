import cors from "cors";
import express from "express";
import helmet from "helmet";
import bodyparser from "body-parser";
import { validateAddShop, validateShopLogin } from "./request-validators.js";
import {
  getLocations,
  getProducts,
  getShops,
  getShopDetail,
  getShopProducts,
  findShopWithEmailOrPhone,
  findShopWithEmailAndPassword,
  addShop,
} from "./dbQueries.js";

const app = express();
app.use(helmet());

const corsOptions = {
  exposedHeaders: "x-auth-token",
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOptions));

// initRoutes(app);

app.use(bodyparser.json({ limit: "1mb" }));
app.use(bodyparser.urlencoded({ extended: false }));

// api to get locations
app.get("/api/locations", async (req, res) => {
  const data = await getLocations();
  if (!data) {
    return res.status(400).send("error to get locations");
  }
  return res.send(data);
});

// api to get products
app.get("/api/products", async (req, res) => {
  const data = await getProducts();
  if (!data) {
    return res.status(400).send("error to get products");
  }
  return res.send(data);
});

// api to get shops
app.get("/api/shops", async (req, res) => {
  if (!req.query.location || !req.query.product) {
    return res.status(400).send("location or product is missing");
  }
  const data = await getShops(req.query.location, req.query.product);
  if (!data) {
    return res.status(400).send("error to get shops");
  }
  return res.send(data);
});

// api to get a shop details
app.get("/api/shop-details", async (req, res) => {
  if (!req.query.id) {
    return res.status(400).send("shop id is missing");
  }

  const data = await getShopDetail(req.query.id);
  if (!data) {
    return res.status(400).send("error in finding shop");
  }
  const shopProducts = await getShopProducts(req.query.id);

  const shopData = data[0];
  if (shopProducts) {
    shopData.products = shopProducts;
  } else {
    shopData.products = [];
  }

  return res.send(shopData);
});

// add shop
app.post("/api/admin/add-shop", async (req, res) => {
  const { error } = validateAddShop(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check phone number or name exists or not
  const data = await findShopWithEmailOrPhone();
  if (data && data.length) {
    return res.status(400).send("shop already exist");
  }

  const response = await addShop(
    req.body.email,
    req.body.name,
    req.body.phoneNumber,
    req.body.location,
    req.body.address,
    req.body.locationName
  );

  if (!response) {
    return res.status(400).send("unable to add shop");
  }
  return res.send("successfully added shop");
});

app.post("/api/shop/login", async (req, res) => {
  const { error } = validateShopLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const data = await findShopWithEmailAndPassword(
    req.body.email,
    req.body.password
  );
  if (!data || !data.length) {
    return res.status(400).send("invalid username or password");
  }

  return res.send(data[0]);
});

app.post("/api/shop/update", (req, res) => {
  //   const { error } = validateAddShop(req.body);
  //   if (error) return res.status(400).send(error.details[0].message);

  // check phone number or name exists or not

  // add shops to db

  const data = [0, 1, 2];
  return res.send(data);
});

app.post("*", function (req, res) {
  res.send({
    message: "Thank you",
  });
});

// errorhandler(app);

app.get("*", function (req, res) {
  res.send("Server is up and Running");
});

const port = 3200;
const server = app.listen(port, () => {
  console.error(`server is running ${port}`);
});
