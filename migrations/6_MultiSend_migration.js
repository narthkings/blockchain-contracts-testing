const MultiSend = artifacts.require("MultiSend");

module.exports = function (deployer, _network, accounts) {
  deployer.deploy(MultiSend, accounts[0]);
};
