// SPDX-License-Identifier: MIT
pragma solidity >=0.4.20;


contract GreatToken{
    string public name = 'Great Token';
    string public symbol = 'GRT';
    string public standard = 'Great Token V1.0';
    uint256 public _totalSupply;

    mapping(address =>  uint256) public balanceOf;

    event Transfer(address indexed _from, address indexed _to,  uint256 _value);

    constructor(uint256 _initalSupply) public {
        balanceOf[msg.sender] = _initalSupply;
        _totalSupply = _initalSupply;
        // alocate the initial supply
    }

     function totalSupply() public view returns (uint) {
        return _totalSupply;
    }

    // Transfer
    function transfer(address _to, uint _value) public returns (bool success){
    // Exeption if contract doesn't have enough
    require(balanceOf[msg.sender] >= _value);
    // transfer of balance
    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;
    // Transfer Event
    emit Transfer(msg.sender, _to, _value);
    // return boolean
    return true;
    }
}