var GreatToken = artifacts.require("./GreatToken.sol")

contract("GreatToken" ,(accounts)=> {
    let tokenInstance;

    it('initialize contract with the corect values',()=>{
        return GreatToken.deployed().then((instance)=>{
            tokenInstance=instance
            return tokenInstance.name()
        }).then((name)=>{
            assert.equal(name ,'Great Token', 'has the correct name')
            return tokenInstance.symbol()
        }).then((symbol)=>{
            assert.equal(symbol ,'GRT', 'has the correct symbol')
            return tokenInstance.standard()
        }).then((standard)=>{
            assert.equal(standard,'Great Token V1.0','has the correct standard')
        })
    })

    it('alocates inital supply upon deployment', async () => {
        return GreatToken.deployed().then((instance)=>{
            tokenInstance = instance
            return tokenInstance.totalSupply()
        }).then((totalSupply)=>{
            assert.equal(totalSupply.toNumber(),10000000,' sets the total supply to 10.000.000  TEST');
            return tokenInstance.balanceOf(accounts[0]);
        }).then((adminBalance)=>{
            assert.equal(adminBalance.toNumber(),10000000, 'it alocates the inital supply to the admin account')
        })
    })

    it('transfers token ownership', ()=>{
        return GreatToken.deployed().then((instance)=>{
            tokenInstance=instance
            // test require -- sending a larger amount that sender has
            return tokenInstance.transfer.call(accounts[1], 109999999999);
        }).then(assert.fail).catch((error)=>{
            assert(error.message.indexOf('revert') >= 0, 'error message must contain revert')
            return tokenInstance.transfer.call(accounts[1],25000, {from: accounts[0]})
        }).then((success)=>{
            assert.equal(success,true,' it return true for a succesful transfer')
            return tokenInstance.transfer(accounts[1], 25000, { from: accounts[0] })
        }).then((receipt)=>{
            assert.equal(receipt.logs.length,1, 'trigger the event');
            assert.equal(receipt.logs[0].event,'Transfer', 'first one should be the Transfer event');
            assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the account the token are transfered from')
            assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the account the token are transfered to')
            assert.equal(receipt.logs[0].args._value, 25000, 'logs the transfer amount')
            return tokenInstance.balanceOf(accounts[1]);
        }).then((balance)=>{
            assert.equal(balance.toNumber(), 25000, 'adds the amont to receiving account')
            return tokenInstance.balanceOf(accounts[0])
        }).then((balance)=>{
            assert.equal(balance.toNumber(), 9975000 , 'substract the amount from sending account')
        })
    })
})