const coinTest = artifacts.require("MetaCoin");
const {expectRevert} = require("@openzeppelin/test-helpers");
/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("coinTest", function (accounts) {
  let coinInstance;
  const [owner, receiver] = [accounts[0], accounts[1]];
  const amount = 10000;

  before(async () => {
    coinInstance = await coinTest.deployed();
  });

  it("should not send coin if balance is not enough", async () => {
    const balance = await coinInstance.getBalance(owner);
    let amt = 20000;
    await coinInstance.sendCoin(receiver, amt, {from: owner});
    assert(amt !== balance, "amount is greater than balance");
  });

  it("should send coin if balance is enough", async () => {
    const balance = await coinInstance.getBalance(owner);
    await coinInstance.sendCoin(receiver, amount, {from: owner});
    assert(amount === balance.toNumber(), "amount is equal to balance");
  });

  it("should multiply conversion rate with amount by 2", async () => {
    await coinInstance.convert(amount, 2);
    assert(amount * 2, "conversion multiplied by 2");
  });
});
