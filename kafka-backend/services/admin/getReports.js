"use strict";
const Seller = require("../../models/seller");
const Order = require("../../models/orders");
const Product = require("../../models/product");
const moment = require("moment");
var mongoose = require("mongoose");
// const redisClient = require("../../utils/redisConfig");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const pool = require("../../utils/mysqlConnection");
const query = require("../../utils/query");

let getReports = async (msg, callback) => {
  let response = {};
  let err = {};
  const today = moment();
  response.results = {};
  var ordersProductsIdArray = [];
  // let sellerId = null;
  var resultArray = [];
  let constructedQuery;
  //order the orders by create_date

  try {
    // console.log("1");
    // if (!!msg.status) {
    //   constructedQuery = `SELECT order_Id, GROUP_CONCAT(product_id) as product_id,GROUP_CONCAT(quantity) as quantity \
    // FROM map_order_product \
    // WHERE status ="${msg.status}"\
    // GROUP BY order_Id \
    //   ORDER BY create_date ASC`;
    //   console.log(constructedQuery);
    // } else {
    //   constructedQuery = `SELECT order_Id, GROUP_CONCAT(product_id) as product_id,GROUP_CONCAT(quantity) as quantity \
    //   FROM map_order_product \
    //   GROUP BY order_Id \
    //     ORDER BY create_date ASC`;
    //   console.log(constructedQuery);
    // }

    const OrdersperDay =
      "SELECT COUNT(DISTINCT order_id) as order_count, create_date \
    FROM product_analytics \
    GROUP BY create_date";

    const top5SellersQuery =
      "select pa.seller_Id as id, u.name as name, sum(pa.product_sales_um) as sales\
    from product_analytics as pa, \
    users as u \
    Where u.id = pa.seller_Id \
    group by pa.seller_Id \
    Order by sum(product_sales_um) desc limit 5";

    const top5UsersQuery =
      "select pa.user_Id as id, u.name as name, sum(pa.product_sales_um) as sales\
    from amazonDB.product_analytics as pa, \
    amazonDB.users as u \
    Where u.id = pa.user_Id \
    group by pa.user_Id \
    Order by sum(pa.product_sales_um) desc limit 5";

    const top5ProductsQuery =
      "select product_Id as id, product_name as name, sum(product_sales_um) as sales\
    from amazonDB.product_analytics as pa \
    group by product_Id \
    Order by sum(product_sales_um) desc limit 5";

    response.results["OrdersperDay"] = await query(pool, OrdersperDay).catch(
      (e) => {
        console.log("Error", e);
      }
    );
    response.results["top5Sellers"] = await query(pool, top5SellersQuery).catch(
      (e) => {
        console.log("Error", e);
      }
    );
    response.results["top5Users"] = await query(pool, top5UsersQuery).catch(
      (e) => {
        console.log("Error", e);
      }
    );
    response.results["top5Products"] = await query(
      pool,
      top5ProductsQuery
    ).catch((e) => {
      console.log("Error", e);
    });
    response.status = STATUS_CODE.SUCCESS;
    response.data = MESSAGES.CREATE_SUCCESSFUL;
    return callback(null, response);

    // top5Users = query(pool, top5SellersQuery)
    // top5Users = query(pool, top5SellersQuery)

    // query(pool, constructedQuery).then(async (sqlResult) => {
    // pool.query(top5Sellers, async (err, sqlResult) => {
    //   console.log("sqlResult is", typeof sqlResult);
    //   if (sqlResult && sqlResult.length > 0) {
    //     response.resultArray = sqlResult;
    //     console.log("response.resultArray is", response.resultArray);
    //     response.status = STATUS_CODE.SUCCESS;
    //     response.data = MESSAGES.CREATE_SUCCESSFUL;
    //     return callback(null, response);
    //   }
    // });
  } catch (error) {
    console.log("Error occ while fetching seller orders" + error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
};

exports.getReports = getReports;