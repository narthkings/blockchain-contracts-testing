const arr_test = artifacts.require("ArrContract");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("arr_test", function (/* accounts */) {
  let deployedInstance = null;
  before(async () => {
    deployedInstance = await arr_test.deployed();
  });
  it("Should be able to push number elements into the array", async () => {
    let num = 2;
    await deployedInstance.insert(num);
    return expect(num).to.be.a("number");
  });
  it("Should be able to get an elements from the array", async () => {
    await deployedInstance.insert(30);
    const getElement = await deployedInstance.arr(1); //deployedInstance.arr(0) means the first element from the variable arr in the contract
    assert(getElement.toNumber());
  });
  it("should return length of the dynamic array", async () => {
    const result = await deployedInstance.getLength();
    return expect(result.toNumber()).to.be.greaterThan(0);
  });
  it("should return of all elements in the array", async () => {
    const result = await deployedInstance.getAll();
    const elements = result.map((element) => element.toNumber()); // why we did this is because truffle sees it result as a big number
    return assert.deepEqual(elements, [2, 30]);
  });
});
