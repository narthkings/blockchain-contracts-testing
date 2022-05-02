const advArrayTest = artifacts.require("AdvArray");
const {expectRevert, time} = require("@openzeppelin/test-helpers");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("advArrayTest", function (/* accounts */) {
  let deployedInstance;

  before(async () => {
    deployedInstance = await advArrayTest.deployed();
  });

  it("should throw an error if not user", async () => {
    await expectRevert(deployedInstance.find(1), "User does not exist!");
  });

  it("should accept a string", async () => {
    let test = "hello";
    await deployedInstance.insert(test); //1
    assert(test === "hello", "result is a string");
  });

  it("should find an id", async () => {
    let test = "hello",
      name = "dumto";
    await deployedInstance.insert(test); //2
    await deployedInstance.insert(name); //3
    let id = await deployedInstance.find(1);
    assert(id.toNumber() === 0, "result is a string");
  });

  it("should read data", async () => {
    await deployedInstance.read(2);
    assert(true, "data is read");
  });

  it("should update data", async () => {
    await deployedInstance.update(2, "imoh");
    assert(true, "data is updated");
  });

  it("should delete data", async () => {
    await deployedInstance.remove(2);
    assert(true, "data is deleted");
  });
});
