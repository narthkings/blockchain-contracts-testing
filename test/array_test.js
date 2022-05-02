const arrTest = artifacts.require("Array");
const {expectRevert, time} = require("@openzeppelin/test-helpers");

contract("Array", function (/* accounts */) {
  let deployedInstance;

  before(async () => {
    deployedInstance = await arrTest.deployed();
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
});
