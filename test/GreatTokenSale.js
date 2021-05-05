var GreatTokenSale = artifacts.require("./GreatTokenSale.sol")

contract("GreatTokenSale",()=>{
    let tokenSaleInstance;

    if("initializes the contract with the correct values",()=>{
        return GreatTokenSale.deployed().then((instance)=>{
            tokenSaleInstance = instance
            return tokenSaleInstance.address
        }).then((address)=>{
            assert.notEqual(address, 0x0, 'has contract address')
            return tokenSaleInstance.tokenContract();
        }).then((address)=>{
            assert.notEqual(address, 0x0, 'has token contract address')

        })
    });
})