const FirstTest = artifacts.require("FirstTest");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("FirstTest", (/* accounts */) => {
  it("should return hello testing contract", async () => {
    const first_test = await FirstTest.deployed();
    const result = await first_test.print();
    return assert(result === "hello testing contract");
  });

  it("Should return string", async () => {
    const name = await FirstTest.deployed();
    const result = await name.getName();
    return assert(result === "");
  });
  it("should set the global variable with a data", async () => {
    const setName = await FirstTest.deployed();
    await setName.setName("DUMTO");
    const res = await setName.getName();
    return assert(res === "DUMTO");
  });
});
