// SPDX-License-Identifier: MIT
pragma solidity >=0.4.20;


contract GreatToken{
    uint256 public _totalSupply;

    mapping(address =>  uint256) public balanceOf;

    constructor(uint256 _initalSupply) public {
        _totalSupply = _initalSupply;
        // alocate the initial supply
    }

     function totalSupply() public view returns (uint) {
        return _totalSupply;
    }
}