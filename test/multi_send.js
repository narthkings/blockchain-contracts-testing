const MultiSend = artifacts.require("MultiSend");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("MultiSend", function (accounts) {
  let deployedInstance = null;

  before(async () => {
    deployedInstance = await MultiSend.deployed();
  });

  it("Should set owner to account[0]", async () => {
    const owner = await deployedInstance.owner();
    assert(owner === accounts[0]);
  });

  it("should not transfer ether if transaction is not made by owner", async () => {
    try {
      let recipients = [accounts[1], accounts[2]];
      await deployedInstance.paySalaryEarners(recipients, 10, {
        from: accounts[0],
        value: 50,
      });
    } catch (error) {
      assert(false, "sender is not allowed");
    }
  });
});
