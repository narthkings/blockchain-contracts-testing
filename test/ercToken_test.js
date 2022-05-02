const {expectRevert, expectEvent} = require('@openzeppelin/test-helpers');
const Token = artifacts.require("ERC.sol");

contract('ERC Token', function (accounts) {
    let tokenInstance;
    const initialBalance = web3.utils.toBN(web3.utils.toWei('1', 'ether'));

    beforeEach(async()=>{
        tokenInstance = await Token.new("Block", "DUM", 18, initialBalance);
    });

    it('Should return total supply', async()=>{
        const supply = await tokenInstance.totalSupply(); //returns as an object
        assert(supply.eq(initialBalance)); // we check if the supply object is equal to the initial balance object
    })
    it('Should return balance of account', async()=>{
        const balance = await tokenInstance.balanceOf(accounts[0]);
        assert(balance.eq(initialBalance));
    });
    it('Should transfer token', async()=>{
        const value = web3.utils.toBN(100);
        const receipt = await tokenInstance.transfer(accounts[1], value); // acct[0] transfers 100 to acct[1]
        const balance1 = await tokenInstance.balanceOf(accounts[0]);// acct[0] balance is reduced by 100
        const initialBalance = web3.utils.toBN(web3.utils.toWei('1', 'ether')); // 1000000
        assert(balance1.eq(initialBalance.sub(value))); //check whether acct[0] balance is equal to initial balance - 100
        expectEvent(receipt, 'Transfer', {from: accounts[0], to: accounts[1], tokens: value});
    });

    it('Should not transfer token if sender does not have enough balance', async()=>{
        const value = web3.utils.toBN(web3.utils.toWei('10', 'ether')); 
        await expectRevert(tokenInstance.transfer(accounts[1], value), "not sufficient balance");
    });

    it('should transfer token when approved', async()=>{
        let allowance;
        let receipt;
        const value = web3.utils.toBN(100); 
       
        allowance = await tokenInstance.allowance(accounts[0], accounts[1]); // checks whether acct[0] has approved acct[1] to spend 100
        
        assert(allowance.isZero()); 
        
        receipt = await tokenInstance.approve(accounts[1], value); // acct[0] approves acct[1] to spend 100
        
        allowance = await tokenInstance.allowance(accounts[0], accounts[1]); // now acct[0] has approved acct[1] to spend 100

        assert(allowance.eq(value));

        expectEvent(receipt, 'Approval', {tokenOwner: accounts[0], spender: accounts[1], tokens: value});

        receipt = await tokenInstance.transferFrom(accounts[0], accounts[2], value, {
            from: accounts[1] 
        }); // acct[0] transfers 100 to acct[2]

        allowance = await tokenInstance.allowance(accounts[0], accounts[1]);

        const balance1 = await tokenInstance.balanceOf(accounts[0]); // acct[0] balance is reduced by 100
        
        const balance2 = await tokenInstance.balanceOf(accounts[2]); // acct[2] balance is increased by 100
       
        assert(balance1.eq(initialBalance.sub(value))); //check whether acct[0] balance is equal to initial balance - 100
        assert(balance2.eq(value)); //check whether acct[2] balance is equal to initial balance - 100
        assert(allowance.isZero()); //check whether allowance is zero
        
        expectEvent(receipt, 'Transfer', {from: accounts[0], to: accounts[2], tokens: value});
    });

    it("should not transfer token if not approved", async()=>{
        await expectRevert(tokenInstance.transferFrom(accounts[0], accounts[1], 10), "allowance too low")
    });
})
