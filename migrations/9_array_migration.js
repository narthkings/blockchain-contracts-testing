const array = artifacts.require("Array");

module.exports = function (deployer) {
  //amount, interest, duration, borrower, lender
  deployer.deploy(array);
};
