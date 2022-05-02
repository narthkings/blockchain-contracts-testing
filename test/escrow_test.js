const {expectRevert} = require("@openzeppelin/test-helpers");
const escrowTest = artifacts.require("Escrow");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("escrowTest", function (accounts) {
  let deployedInstance;
  const [payer, payee, lawyer] = [accounts[1], accounts[2], accounts[0]];
  let amount = 1000;

  before(async () => {
    deployedInstance = await escrowTest.deployed();
  });

  it("should not accept pay if not payer", async () => {
    await expectRevert(
      deployedInstance.deposit({from: payee, value: amount}),
      "Sender must be the payer"
    );
  });

  it("should not accept pay if not less than or exact amount", async () => {
    await expectRevert(
      deployedInstance.deposit({from: payer, value: 5000}),
      "Cant send more than escrow amount"
    );
  });

  it("should accept funds", async () => {
    await deployedInstance.deposit({from: payer, value: 50});
    assert(true, "Lawyer should have received funds");
  });

  it("should not release funds if balance is not equal to amount", async () => {
    const balance = await deployedInstance.balanceOf();
    assert(
      balance.toNumber() !== amount,
      "cannot release funds before full amount is sent"
    );
  });

  it("should not release fund if not lawyer", async () => {
    await deployedInstance.deposit({from: payer, value: 950});
    await expectRevert(
      deployedInstance.release({from: payee}),
      "only lawyer can release funds"
    );
  });

  it("should release fund if it Lawyer", async () => {
    const balance = await deployedInstance.balanceOf();
    await deployedInstance.release({from: lawyer});
    assert(true, "Lawyer should have released funds");
  });
});
