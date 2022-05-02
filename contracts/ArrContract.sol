// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract ArrContract {
  uint256[] public arr;

  function insert(uint256 _val) public {
    arr.push(_val);
  }

  function getLength() public view returns (uint256) {
    return arr.length;
  }

  function getAll() public view returns (uint256[] memory) {
    return arr;
  }
}
