// SPDX-License-Identifier: MIT
pragma solidity >=0.4.20;


contract GreatToken{
    string public name = 'Great Token';
    string public symbol = 'GRT';
    string public standard = 'Great Token V1.0';
    uint256 public _totalSupply;

    mapping(address =>  uint256) public balanceOf;

    constructor(uint256 _initalSupply) public {
        balanceOf[msg.sender] = _initalSupply;
        _totalSupply = _initalSupply;
        // alocate the initial supply
    }

     function totalSupply() public view returns (uint) {
        return _totalSupply;
    }
}