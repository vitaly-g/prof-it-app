"use strict";

const controller = require("./controller");

module.exports.set = app => {
  app.post("/operation/find", controller.findOperations);
};
