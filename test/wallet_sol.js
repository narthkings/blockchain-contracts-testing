const {expectRevert} = require("@openzeppelin/test-helpers");
const walletSOl = artifacts.require("WalletSOL");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("walletSOl", function (accounts) {
  let walletInstance;
  let [app1, app2, app3, receiver] = [accounts[1], accounts[2], accounts[3], accounts[4]];
  let quorum = 2;
  let amount = 20;

  before(async () => {
    walletInstance = await walletSOl.deployed();
  });

  it("should not allow if not approver to create transfer", async () => {
    await expectRevert(
      walletInstance.createTransfer(amount, accounts[0]),
      "only approver allowed"
    );
  });

  it("should allow approver to create transfer", async () => {
    // approver 1 would pay funds to approver 4 wallet
    await walletInstance.createTransfer(amount, receiver, {from: app1});
    assert(true, "transfer created");
  });

  it("should not allow if not approver to approve transfer", async () => {
    await expectRevert(
      walletInstance.sendTransfer(1, {from: accounts[0]}),
      "only approver allowed"
    );
  });

  it("should not allow if transfer has been sent", async () => {
    await walletInstance.sendTransfer(1, {from: app1});
    const status = await walletInstance.transfers(1);
    assert(status.sent === false, "transfer has not been sent");
  });

  it("should check approvers is greater than or equal to quorum", async () => {
    await walletInstance.sendTransfer(1, {from: app2});
    const status = await walletInstance.transfers(1);
    assert.isAtLeast(
      status.approvals.toNumber(),
      quorum,
      "approvers is greater than or equal to quorum"
    );
  });
});
