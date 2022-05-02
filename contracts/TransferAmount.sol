// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TransferAmount {
  address owner;

  modifier OwnerOnly {
    require(msg.sender == owner,  "Only owner has access to this function");
    _;
  } 

  constructor(address _owner){
    owner = _owner;
  }

  function send(address payable[] memory _to, uint256[] memory _value) public payable OwnerOnly {

    require(_to.length == _value.length, "to and value must be same length");

    for (uint256 i = 0; i < _to.length; i++) { // what this loop does is to send ether to each address in the array from the amount array
      _to[i].transfer(_value[i]);
    }
  }
}
 