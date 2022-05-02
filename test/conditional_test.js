const Conditional = artifacts.require("Conditionals");

contract("Conditional", () => {
  let deployedInstance = null;
  before(async () => {
    deployedInstance = await Conditional.deployed();
  });
  it("Should check whether a is greater than b", async () => {
    try {
      const result = await deployedInstance.check(5, 1);
      assert(result.toNumber() === 5);
    } catch (err) {
      return assert(false, "a should be greater than b");
    }
  });
});
