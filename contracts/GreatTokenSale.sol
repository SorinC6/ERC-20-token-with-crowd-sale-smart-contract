// SPDX-License-Identifier: MIT
pragma solidity >=0.4.20;

import './GreatToken.sol';

contract GreatTokenSale {
    address admin;
    GreatToken public tokenContract;

    constructor(GreatToken _tokenContract) public {
        admin = msg.sender;
        tokenContract = _tokenContract;
        // Token Contract
        // Token Price
    }
}