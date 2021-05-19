// SPDX-License-Identifier: MIT
pragma solidity >=0.4.20;

import "./GreatToken.sol";

contract GreatTokenSale {
    address admin;
    GreatToken public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokenSold;

    event Sell(address _buyer, uint256 _amount);

    constructor(GreatToken _tokenContract, uint256 _tokenPrice) public payable {
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
    }

    // safe math function
    function multiply(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require(y == 0 || (z = x * y) / y == x);
    }

    // Buy tokens
    function buyTokens(uint256 _numberOfTokens) public payable {
        // require that value is equal to token price
        require(msg.value == multiply(_numberOfTokens, tokenPrice));
        // require that the contract has enough tokens
        require(tokenContract.balanceOf(address(this)) >= _numberOfTokens);

        // require that a transfer in succesful
        require(tokenContract.transfer(msg.sender, _numberOfTokens));
        // keep track  of numer of token sold
        tokenSold += _numberOfTokens;

        // Emit Sell Event
        emit Sell(msg.sender, _numberOfTokens);
    }

    // ending the token sale
    function endSale() public {
        // require that only the admin can end the sale
        require(msg.sender == admin);
        require(
            tokenContract.transfer(
                admin,
                tokenContract.balanceOf(address(this))
            )
        );
        // destrory contract
        // selfdestruct(nftAddress);
    }
}
