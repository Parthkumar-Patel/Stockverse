// Author : Shiv Gaurang Desai (B00862445)
const express = require("express");

const {
  getCustomBasket,
  addCustomBasket,
  deleteCustomBasket,
  getCustomBasketById,
  getCustomBasketByVisibility,
} = require("../controllers/customBasketController");

const customBasketRouter = express.Router();

// mapping of the end-points with the different controllers
customBasketRouter.get("/getCustomBasketList", getCustomBasket);
customBasketRouter.post("/addCustomBasket", addCustomBasket);
customBasketRouter.delete(
  "/deleteCustomBasket/:customBasketId",
  deleteCustomBasket
);
customBasketRouter.get(
  "/getCustomBasketById/:customBasketId",
  getCustomBasketById
);
customBasketRouter.get(
  "/getCustomBasketByVisibility",
  getCustomBasketByVisibility
);

//if the url does not matches with any end point then this response will be sent
customBasketRouter.use("*", (req, res) => {
  res.status(400).json({ success: false, message: "Page not found" });
});

module.exports = customBasketRouter;
