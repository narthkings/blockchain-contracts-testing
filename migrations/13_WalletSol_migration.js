const wallet = artifacts.require("WalletSOL");

module.exports = function (deployer, _network, accounts) {
  deployer.deploy(wallet, [accounts[1], accounts[2], accounts[3]], 2);
};
