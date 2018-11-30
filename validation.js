"use strict";

const Joi = require("joi");

const searchOperationRequest = Joi.object({
  pool: Joi.object({
    searchQuery: Joi.array().items([
      Joi.object({
        operationId: Joi.array().items(Joi.number().integer()).strict(true),
        senderId: Joi.array().items(Joi.number().integer()).strict(true),
        senderName: Joi.string(),
        senderCode: Joi.string(),
        consigneeId: Joi.array().items(Joi.number().integer()).strict(true),
        consigneeName: Joi.string(),
        consigneeCode: Joi.string(),
        clientId: Joi.array().items(Joi.number().integer()).strict(true),
        clientName: Joi.string()
      }).xor(
        "operationId",
        "senderId",
        "senderName",
        "senderCode",
        "consigneeId",
        "consigneeName",
        "consigneeCode",
        "clientId",
        "clientName"
      )
    ]),
    limit: Joi.number().integer(),
    offset: Joi.number().integer()
  })
});

module.exports = {
  searchOperationRequest
};
