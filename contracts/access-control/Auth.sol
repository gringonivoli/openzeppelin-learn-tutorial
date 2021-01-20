// contracts/Box.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.7.4;


contract Auth {
    address private administrator;

    constructor() {
        administrator = msg.sender;
    }

    function isAdministrator(address user) public view returns (bool) {
        return user == administrator;
    }
}
