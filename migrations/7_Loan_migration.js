const Loan = artifacts.require("Loan");

module.exports = function (deployer, _network, accounts) {
  //amount, interest, duration, borrower, lender
  deployer.deploy(Loan, 1000, 10, 100, accounts[1], accounts[2]);
};
