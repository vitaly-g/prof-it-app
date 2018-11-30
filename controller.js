"use strict";

const services = require("./services");
const validation = require("./validation");

class Controller {
  async findOperations(req, res) {
    try {
      const isValidate = validation.searchOperationRequest.validate(req.body);
      if (isValidate.error) {
        throw new Error(isValidate.error);
      }
      const { searchQuery, limit, offset } = req.body.pool;
      const result = await services.searchOperations(
        searchQuery,
        limit,
        offset
      );
      res.send({
        error: false,
        result,
        pool: req.body.pool
      });
    } catch (err) {
      res.send({
        error: true,
        message: err.message
      });
    }
  }
}

module.exports = new Controller();
