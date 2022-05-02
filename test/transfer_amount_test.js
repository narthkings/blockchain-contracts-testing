const transfer_amount_test = artifacts.require("TransferAmount");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("transfer_amount_test", function (accounts) {
  let deployedInstance = null;

  before(async () => {
    deployedInstance = await transfer_amount_test.deployed();
  });

  it("should transfer amount", async () => {
    const recipients = [accounts[1], accounts[2], accounts[3]];
    const amounts = [10, 20, 30];

    //get all recipients initial balances
    const initialBalances = await Promise.all(
      recipients.map(async (recipient) => {
        return web3.eth.getBalance(recipient);
      })
    );

    //transfer amount
    await deployedInstance.send(recipients, amounts, {
      from: accounts[0],
      value: 90,
    });

    //get all recipients final balances
    const finalBalances = await Promise.all(
      recipients.map(async (recipient) => {
        return web3.eth.getBalance(recipient);
      })
    );

    //check that the final balances are correct
    recipients.forEach((_item, i) => {
      const finalBalance = web3.utils.toBN(finalBalances[i]);
      const initialBalance = web3.utils.toBN(initialBalances[i]);
      assert(finalBalance.sub(initialBalance).toNumber() === amounts[i]);
    });
  });

  it("should not transfer amount if array length is not the same", async () => {
    const recipient = [accounts[1], accounts[2], accounts[3]];
    const amounts = [10, 20];
    try {
      await deployedInstance.send(recipient, amounts, {
        from: accounts[0],
        value: 90,
      });
    } catch (error) {
      assert(error.message.includes("to and value must be same length"));
      return;
    }
    assert(false);
  });

  it("should  not transfer if caller is not the owner", async () => {
    const recipients = [accounts[1], accounts[2], accounts[3]];
    const amounts = [10, 20, 30];
    try {
      await deployedInstance.send(recipients, amounts, {
        from: accounts[0],
        value: 90,
      });
    } catch (error) {
      assert(false, error.message);
      return;
    }
  });
});
