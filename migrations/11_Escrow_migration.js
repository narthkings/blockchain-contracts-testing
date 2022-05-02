const Escrow = artifacts.require("Escrow");

module.exports = function (deployer, _network, accounts) {
  deployer.deploy(Escrow, 1000, accounts[1], accounts[2]);
};
