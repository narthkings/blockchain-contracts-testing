const Fibonacci = artifacts.require("Fibonacci");

module.exports = function (deployer) {
  //amount, interest, duration, borrower, lender
  deployer.deploy(Fibonacci);
};
