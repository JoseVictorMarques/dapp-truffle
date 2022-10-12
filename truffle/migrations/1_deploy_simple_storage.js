require('dotenv').config();

const SimpleStorage = artifacts.require("MedRecord");
const adminKey = process.env["ADMIN_KEY"];

module.exports = function (deployer) {
  deployer.deploy(SimpleStorage,adminKey);
};
