const wallet_test = artifacts.require("Wallet");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("wallet_test", function (accounts) {
  let wallet = null;

  before(async () => {
    wallet = await wallet_test.deployed();
  });

  it("should set account[0] as owner", async () => {
    const owner = await wallet.owner();
    assert(owner === accounts[0]);
  });

  it("should deposit ether to wallet", async () => {
    await wallet.deposit({from: accounts[0], value: 50}); // deposit 50 ether to wallet
    const balance = await web3.eth.getBalance(wallet.address); //calling contract's address balance
    assert(Number(balance) === 50); //web3 returns a type string, so we need to convert it to a number
  });

  it("should return balance of wallet", async () => {
    const balance = await wallet.balanceOf();
    assert(balance.toNumber() === 50);
  });

  it("Should transfer ether to another address", async () => {
    const receiver_balance = await web3.eth.getBalance(accounts[1]);
    await wallet.send(accounts[1], 10, {from: accounts[0]});
    const receiver_balance_after = await web3.eth.getBalance(accounts[1]);
    const finalBalance = web3.utils.toBN(receiver_balance_after); //object
    const initialBalance = web3.utils.toBN(receiver_balance); //object
    assert(finalBalance.sub(initialBalance).toNumber() === 10); //subtract the two balances and convert to number and see if it is equal to 10
  });

  it("should not transfer ether if tx is not sent by owner", async () => {
    try {
      await wallet.send(accounts[1], 10, {from: accounts[0]});
    } catch (error) {
      assert(false, "sender is not allowed");
    }
  });
});
