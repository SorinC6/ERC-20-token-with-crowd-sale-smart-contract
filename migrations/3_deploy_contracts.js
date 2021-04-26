var GreatToken = artifacts.require("./GreatToken.sol");

module.exports = function(deployer) {
  deployer.deploy(GreatToken);
};
