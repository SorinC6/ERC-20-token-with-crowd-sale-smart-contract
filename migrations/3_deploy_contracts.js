var GreatToken = artifacts.require("./GreatToken.sol");
var GreatTokenSale = artifacts.require("./GreatTokenSale.sol")

module.exports = function(deployer) {
  deployer.deploy(GreatToken, 10000000).then(()=>{
    // Token price is 0.001 Ether
    var tokenPrice = 1000000000000000; // wei
    return deployer.deploy(GreatTokenSale, GreatToken.address, tokenPrice);
  });
};
