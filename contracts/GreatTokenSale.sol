// SPDX-License-Identifier: MIT
pragma solidity >=0.4.20;

import './GreatToken.sol';

contract GreatTokenSale {
    address admin;
    GreatToken public tokenContract;
    uint256 public tokenPrice;

    constructor(GreatToken _tokenContract, uint256 _tokenPrice) public {
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
    }
}