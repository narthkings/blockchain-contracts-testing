const fibonacciTest = artifacts.require("Fibonacci");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("fibonacciTest", function (/* accounts */) {
  let deployedInstance;

  before(async () => {
    deployedInstance = await fibonacciTest.deployed();
  });

  it("should return a number", async () => {
    const result = await deployedInstance.fib(5);
    assert.isNumber(result.toNumber(), "result is a number");
  });
  it("should return 0 in base case if 0 is inputted", async () => {
    const result = await deployedInstance.fib(0);
    assert.equal(result.toNumber(), 0, "result is 0");
  });
});
