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

    it('approves tokens for delegated transfer', ()=>{
        return GreatToken.deployed().then((instance)=>{
            tokenInstance=instance
            return tokenInstance.approve.call(accounts[1],100);
        }).then((success)=>{
            assert.equal(success,true,'return true when approving')
            return tokenInstance.approve(accounts[1],100, { from : accounts[0] });
        }).then((receipt)=>{
            assert.equal(receipt.logs.length,1, 'trigger the event');
            assert.equal(receipt.logs[0].event,'Approval', 'first one should be the Approval event');
            assert.equal(receipt.logs[0].args._owner, accounts[0], 'logs the account that tokens are authorized by')
            assert.equal(receipt.logs[0].args._spender, accounts[1], 'logs the account the tokens are authotrized to')
            assert.equal(receipt.logs[0].args._value, 100, 'logs the transfer amount')         
            return tokenInstance.allowance(accounts[0],accounts[1]);   
        }).then((allowance)=>{
            assert.equal(allowance.toNumber(), 100 , 'stores the allowance for delegated transfer')
        })
    })

    it('handles delegate tokens transfer',()=>{
        return GreatToken.deployed().then((instance)=>{
            tokenInstance=instance
            fromAccount = accounts[2];
            toAccount = accounts[3];
            spendingAccount = accounts[4];
            //transfer  some tokens to fromAccount
            return tokenInstance.transfer(fromAccount, 100, {from: accounts[0]});
        }).then((receipt)=>{
            // approve spending accunt to spend 10 tokens from fromAccounts
            return tokenInstance.approve(spendingAccount , 10 ,{ from : fromAccount })
        }).then((receipt)=>{
            // try trasfering something larger then sender balance
            return tokenInstance.transferFrom(fromAccount, toAccount, 1000, { from: spendingAccount })
        }).then(assert.fail).catch((error)=>{
            assert(error.message.indexOf('revert') >= 0, 'cannot transfer value larger then balance');
            // try transfering something larger that the approved amount
            return tokenInstance.transferFrom(fromAccount, toAccount, 20, {from: spendingAccount})
        }).then(assert.fail).catch((error)=>{
            assert(error.message.indexOf('revert') >=0 , 'cannot transfer value larger than approved amount')
            return tokenInstance.transferFrom.call(fromAccount, toAccount, 10, { from: spendingAccount })
        }).then((success)=>{
            assert.equal(success,true)
            return tokenInstance.transferFrom(fromAccount, toAccount, 10, { from: spendingAccount })
        }).then((receipt)=>{
            assert.equal(receipt.logs.length,1, 'trigger the event');
            assert.equal(receipt.logs[0].event,'Transfer', 'first one should be the Transfer event');
            assert.equal(receipt.logs[0].args._from, fromAccount, 'logs the account the token are transfered from')
            assert.equal(receipt.logs[0].args._to, toAccount, 'logs the account the token are transfered to')
            assert.equal(receipt.logs[0].args._value, 10, 'logs the transfer amount')
            return tokenInstance.balanceOf(fromAccount)
        }).then((balance)=>{
            assert.equal(balance.toNumber(), 90 , 'deduct the amount from sending account');
            return tokenInstance.balanceOf(toAccount)
        }).then((balance)=>{
            assert.equal(balance.toNumber(), 10 , 'deduct the amount from sending account');
            return tokenInstance.allowance(fromAccount, spendingAccount);
        }).then((allowance)=>{
            assert.equal(allowance.toNumber(), 0 ,'deduct the amount from the allowance')
        })
    })
})