// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Escrow {
    uint256 public amount;
    address public payer;
    address payable public payee;
    address public lawyer;

    constructor(
        uint256 _amount,
        address _payer,
        address payable _payee
    ) {
        amount = _amount;
        payer = _payer;
        payee = _payee;
        lawyer = msg.sender;
    }

    function deposit() public payable {
        require(msg.sender == payer, "Sender must be the payer");
        require(
            address(this).balance <= amount,
            "Cant send more than escrow amount"
        );
    }

    function release() public {
        require(
            address(this).balance == amount,
            "cannot release funds before full amount is sent"
        );
        require(msg.sender == lawyer, "only lawyer can release funds");
        payee.transfer(amount);
    }

    function balanceOf() public view returns (uint256) {
        return address(this).balance;
    }
}