// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract FirstTest {
  string public name;

  function print() public pure returns(string memory){
    return "hello testing contract";
  }

  function getName() public view returns(string memory){
    return name;
  }

  function setName(string memory _name)public{
    name = _name;
  }


}
