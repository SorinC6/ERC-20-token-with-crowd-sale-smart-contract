var GreatToken = artifacts.require("./GreatToken.sol");
var GreatTokenSale = artifacts.require("./GreatTokenSale.sol")

module.exports = function(deployer) {
  deployer.deploy(GreatToken, 10000000).then(()=>{
    return deployer.deploy(GreatTokenSale, GreatToken.address);
  });
};
