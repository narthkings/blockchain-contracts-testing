// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Wallet {
  address payable public owner;

  constructor(address payable _owner) {
    owner = _owner;
  }

  function deposit()public payable{} // deposit ether to wallet contract

  function balanceOf()public view returns(uint256){
    return address(this).balance;
  }

  function send(address payable _to, uint256 _value)public payable{
    if(msg.sender == owner){
      _to.transfer(_value);
      return;
    }
    revert("sender is not allowed");
  }
}
