// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Conditionals {
  function check(uint256 a, uint256 b) public pure returns(uint256 c) {
    require(a > b, "a must be greater than b");
    c = a;
    return c;
  }
}
