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
})