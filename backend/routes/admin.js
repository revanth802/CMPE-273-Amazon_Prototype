"use strict";
const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const pool = require("../utils/mysqlConnection");
// const { checkAuth } = require("../utils/passport");
const logger = require("../utils/logger");

/**
 * to deactivate an account
 * @param req: user_id
 */

router.get("/get-product-categories", async (req, res) => {
  let msg = req.body;
  msg.route = "get_product_categories";

  kafka.make_request("getProductCategories", msg, function (err, results) {
    if (err) {
      msg.error = err.data;
      return res.status(err.status).send(err.data);
    } else {
      msg.status = results.status;
      logger.info(msg);
      return res.status(results.status).send(results.result);
    }
  });
});

router.post("/add-category", async (req, res) => {
  let msg = req.body;
  msg.route = "add_category";

  kafka.make_request("addCategory", msg, function (err, results) {
    if (err) {
      msg.error = err.data;
      return res.status(err.status).send(err.data);
    } else {
      msg.status = results.status;
      logger.info(msg);
      return res.status(results.status).send(results);
    }
  });
});

router.delete("/delete-category/:categoryId", async (req, res) => {
  let msg = req.body;
  msg.categoryId = req.params.categoryId;
  msg.route = "delete_category";

  kafka.make_request("deleteCategory", msg, function (err, results) {
    if (err) {
      console.log("Errorrr", err);
      msg.error = err.data;
      return res.status(err.status).send(err.data);
    } else {
      console.log("Success", results);
      msg.status = results.status;
      logger.info(msg);
      return res.status(results.status).send(results);
    }
  });
});

router.get("/products/:categoryId", async (req, res) => {
  let msg = req.body;
  msg.categoryId = req.params.categoryId;
  msg.route = "products_by_category";

  kafka.make_request("getProductsByCategory", msg, function (err, results) {
    if (err) {
      console.log("Errorrr", err);
      msg.error = err.data;
      return res.status(err.status).send(err.data);
    } else {
      console.log("Success", results);
      msg.status = results.status;
      logger.info(msg);
      return res.status(results.status).send(results);
    }
  });
});

module.exports = router;