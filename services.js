"use strict";

const db = require("./db");

function buildWhere(searchObject) {
  const querymap = {
    operationId: `oper.id IN (${searchObject.operationId})`,
    senderId: `oper."senderId" IN (${searchObject.senderId})`,
    senderCode: `oper."senderCode" = '${searchObject.senderCode}'`,
    senderName: `LOWER("senderName") LIKE LOWER('${searchObject.senderName}')`,
    consigneeId: `oper."consigneeId" IN (${searchObject.consigneeId})`,
    consigneeCode: `oper."consigneeCode" = '${searchObject.consigneeCode}'`,
    consigneeName: `LOWER("consigneeName") LIKE LOWER('${
      searchObject.consigneeName
    }')`,
    clientId: `oper."clientId" IN (${searchObject.clientId})`,
    clientName: `LOWER("clientName") LIKE LOWER('${searchObject.clientName}')`
  };

  return Object.keys(searchObject)
    .filter(k => Boolean(searchObject[k]))
    .map(k => querymap[k])
    .join(" AND ");
}

class Services {
  async searchOperations(searchQuery, limit = 10, offset = 0) {
    const searchObject = Object.assign({}, ...searchQuery);
    let searchWhere = buildWhere(searchObject);
    let where = `
      WHERE oper."senderDelete" IS NULL 
        AND oper."clientDelete" IS NULL
        AND oper."consigneeDelete" IS NULL`;
    if (searchWhere) {
      where += ` AND ${searchWhere}`;
    }
    const query = `
      SELECT * 
      FROM search_operations oper
      ${where} 
      LIMIT ${limit}
      OFFSET ${offset};`;
    const result = await db.client.query(query);

    return result.rows;
  }
}

module.exports = new Services();
