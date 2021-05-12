var GreatTokenSale = artifacts.require("./GreatTokenSale.sol")
var GreatToken = artifacts.require("./GreatToken.sol");

contract("GreatTokenSale", (accounts) => {
    let tokenSaleInstance;
    let tokenInstance;
    let admin = accounts[0];
    let buyer = accounts[1];
    let tokenPrice = 1000000000000000; // wei
    let tokensAvailable = 7500000
    let numberOfTokens;

    it("initializes the contract with the correct values", () => {
        return GreatTokenSale.deployed().then((instance) => {
            tokenSaleInstance = instance
            return tokenSaleInstance.address
        }).then((address) => {
            assert.notEqual(address, 0x0, 'has contract address')
            return tokenSaleInstance.tokenContract();
        }).then((address) => {
            assert.notEqual(address, 0x0, 'has token contract address')
            return tokenSaleInstance.tokenPrice();
        }).then((price) => {
            assert.equal(price, tokenPrice, 'token price is correct')
        })
    });

    it('facilitates token buying', () => {
        return GreatToken.deployed().then(async (instance) => {
            // Grab token instance first
            tokenInstance = instance
            tokenSaleInstance = await GreatTokenSale.deployed();
            //provide 75% of all tokens to token sale
            await tokenInstance.transfer(tokenSaleInstance.address, tokensAvailable, { from: admin })
            numberOfTokens = 10;
            let value = numberOfTokens * tokenPrice
            return tokenSaleInstance.buyTokens(numberOfTokens, { from: buyer, value: value })
        }).then((receipt) => {
            assert.equal(receipt.logs.length, 1, 'trigger the event');
            assert.equal(receipt.logs[0].event, 'Sell', 'should be the "Sell event');
            assert.equal(receipt.logs[0].args._buyer, buyer, 'logs the account that purchase the token')
            assert.equal(receipt.logs[0].args._amount, numberOfTokens, 'logs the number of token purchased')

            return tokenSaleInstance.tokenSold();
        }).then((amount) => {
            assert.equal(amount.toNumber(), numberOfTokens, ' increments the number of tokens sold')
            return tokenInstance.balanceOf(tokenSaleInstance.address)
            // try to buy tokens different from ether value
        }).then((balance) => {
            assert.equal(balance.toNumber(), tokensAvailable - numberOfTokens, 'check the balance of tokenInstance')
            return tokenSaleInstance.buyTokens(numberOfTokens, { from: buyer, value: 1 })
        }).then(assert.fail).catch((error) => {
            assert(error.message.indexOf('revert') >= 0, 'msg.value must equal number of tokens in wei')
            return tokenSaleInstance.buyTokens(8000000, { from: buyer, value: numberOfTokens * tokenPrice })
        }).then(assert.fail).catch((error) => {
            assert(error.message.indexOf('revert') >= 0, 'cannot purchase more tokens than is available')
        })
    })
})