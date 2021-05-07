var GreatTokenSale = artifacts.require("./GreatTokenSale.sol")

contract("GreatTokenSale",(accounts)=>{
    let tokenSaleInstance;
    let buyer = accounts[1];
    var tokenPrice = 1000000000000000; // wei
    let numberOfTokens;

    it("initializes the contract with the correct values",()=>{
        return GreatTokenSale.deployed().then((instance)=>{
            tokenSaleInstance = instance
            return tokenSaleInstance.address
        }).then((address)=>{
            assert.notEqual(address, 0x0, 'has contract address')
            return tokenSaleInstance.tokenContract();
        }).then((address)=>{
            assert.notEqual(address, 0x0, 'has token contract address')
            return tokenSaleInstance.tokenPrice();
        }).then((price)=>{
            assert.equal(price, tokenPrice, 'token price is correct')
        })
    });

    it('facilitates token buying', ()=>{
        return GreatTokenSale.deployed().then((instance)=>{
            tokenSaleInstance = instance
            numberOfTokens = 10;
            let value = numberOfTokens * tokenPrice
            return tokenSaleInstance.buyTokens(numberOfTokens, {from: buyer, value: value})
        }).then((receipt)=>{
            assert.equal(receipt.logs.length,1, 'trigger the event');
            assert.equal(receipt.logs[0].event,'Transfer', 'first one should be the Transfer event');
            assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the account the token are transfered from')
            assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the account the token are transfered to')
            assert.equal(receipt.logs[0].args._value, 25000, 'logs the transfer amount')
            
            return tokenSaleInstance.tokenSold();
        }).then((amount)=>{
            assert.equal(amount.toNumber(), numberOfTokens, ' increments the number of tokens sold')
        })
    })
})