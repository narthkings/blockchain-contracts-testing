const {expectRevert, time} = require("@openzeppelin/test-helpers");
const loanTest = artifacts.require("Loan");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("loanTest", (accounts) => {
  let loanInstance;
  const amount = 1000;
  const interest = 10;
  const duration = 100;
  const [borrower, lender] = [accounts[1], accounts[2]];

  before(async () => {
    loanInstance = await loanTest.deployed();
  });

  it("should not accept lend if not lender", async function () {
    await expectRevert(
      loanInstance.lend({from: borrower, value: amount}),
      "only lender can lend"
    );
  });

  it("should not accept lend amount if not exact amount", async () => {
    await expectRevert(
      loanInstance.lend({from: lender, value: 100}),
      "can only lend the exact amount"
    );
  });

  it("should accept lender amount", async () => {
    const balanceBefore = web3.utils.toBN(await web3.eth.getBalance(borrower));
    await loanInstance.lend({from: lender, value: amount});
    const balanceAfter = web3.utils.toBN(await web3.eth.getBalance(borrower));
    const state = await loanInstance.state();
    assert(state.toNumber() === 1, "state should be 1");
    assert(
      balanceAfter.sub(balanceBefore).toNumber() === amount,
      "borrower should have received amount"
    );
  });

  it("Should not reimburse if not borrower", async () => {
    await expectRevert(
      loanInstance.reimburse({from: accounts[3], value: amount + interest}),
      "only borrower can reimburse"
    );
  });

  it("should not reimburse if not exact amount", async () => {
    await expectRevert(
      loanInstance.reimburse({from: borrower, value: 50}),
      "borrower need to reimburse exactly amount + interest"
    );
  });

  it("should not reimburse if loan has not mature", async () => {
    await expectRevert(
      loanInstance.reimburse({from: borrower, value: amount + interest}),
      "loan has not matured"
    );
  });

  it("should reimburse", async () => {
    time.increase(duration + 10);
    const balanceBefore = web3.utils.toBN(await web3.eth.getBalance(lender));
    await loanInstance.reimburse({from: borrower, value: amount + interest});
    const balanceAfter = web3.utils.toBN(await web3.eth.getBalance(lender));
    const state = await loanInstance.state();
    assert(state.toNumber() === 2, "state should be 2");
    assert(
      balanceAfter.sub(balanceBefore).toNumber() === amount + interest,
      "lender should have received amount + interest"
    );
  });
});
