// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract MultiSend {
  
  //first of all we need a sender account to send the ether to addresses
  //make  sure only owner of smart conract can send ether to addresses

  address payable public owner;

  constructor(address payable _owner) {
    owner = _owner;
  }

  modifier onlyOwnerCanDisburse(){
    require(msg.sender == owner,  "Only owner has access to this function");
    _;
  }

  function paySalaryEarners(address payable[] memory toRecipients, uint256 amount) public payable onlyOwnerCanDisburse{
    require(toRecipients.length > 0, "No recipients to send ether to");
    
    for(uint256 i=0; i< toRecipients.length; i++){
      toRecipients[i].transfer(amount);
    }
  }

  function getOwnerBalance()public view returns(uint){
    return owner.balance;
  }
}
