const ArrContract = artifacts.require("ArrContract");

module.exports = function (deployer) {
  deployer.deploy(ArrContract);
};
