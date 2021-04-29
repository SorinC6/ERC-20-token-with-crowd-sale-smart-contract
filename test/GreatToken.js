var GreatToken = artifacts.require("./GreatToken.sol")

contract("GreatToken" ,(accounts)=> {
    let tokenInstance;

    it('sets the total supply upon deployment', async () => {
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