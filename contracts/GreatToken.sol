// SPDX-License-Identifier: MIT
pragma solidity >=0.4.20;


// Followed the standard implementation
// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md

contract GreatToken{
    string public name = 'Great Token';
    string public symbol = 'GRT';
    string public standard = 'Great Token V1.0';
    uint256 public _totalSupply;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed _from, address indexed _to,  uint256 _value);

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    constructor(uint256 _initalSupply) public {
        balanceOf[msg.sender] = _initalSupply;
        // alocate the initial supply
        _totalSupply = _initalSupply;
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

    //Approve 
    function approve(address _spender, uint _value) public returns (bool success){
        // handle allowance
        allowance[msg.sender][_spender] = _value;
        //handle Approve event
        emit Approval(msg.sender, _spender, _value);

        return true;
    }

    //transferFrom
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){
        // require from account has enough tokens
        require(_value <= balanceOf[_from]);
        // require allowance is bi enough
        require(_value <= allowance[_from][msg.sender]);
        // change the balance
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        // update allowance
        allowance[_from][msg.sender] -= _value;

        emit Transfer(_from, _to, _value);
        return true;
    }

}