var GreatToken = artifacts.require("./GreatToken.sol")

contract("GreatToken" ,(accounts)=> {

    it('sets the total supply upon deployment', async () => {
        return GreatToken.deployed().then((instance)=>{
            tokenInstance = instance
            return tokenInstance._totalSupply()
        }).then((totalSupply)=>{
            assert.equal(totalSupply.toNumber(),10000000,' sets the total supply to 10.000.000  TEST')
        })
    })
})