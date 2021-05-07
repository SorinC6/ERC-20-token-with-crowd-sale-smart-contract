// SPDX-License-Identifier: MIT
pragma solidity >=0.4.20;

import './GreatToken.sol';

contract GreatTokenSale {
    address admin;
    GreatToken public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokenSold;

    constructor(GreatToken _tokenContract, uint256 _tokenPrice) public {
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
    }

    // Buy tokens
    function buyTokens(uint256 _numberOfTokens) public payable {
        // require that value is equal to token price
        // require that the contract has enough tokens
        // require that a transfer in succesful

        // keep track  of numer of token sold
        tokenSold += _numberOfTokens;

        // Emit Sell Event
    }
}