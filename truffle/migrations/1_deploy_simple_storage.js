const SimpleStorage = artifacts.require("MedRecord");

module.exports = function (deployer) {
  deployer.deploy(SimpleStorage);
};
