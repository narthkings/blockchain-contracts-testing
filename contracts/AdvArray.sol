// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract AdvArray {
    struct User {
        uint256 id;
        string name;
    }
    User[] public users;
    uint256 public nextId = 1;

    function insert(string memory name) public {
        users.push(User(nextId, name));
        nextId++;
    }

    function read(uint256 id) public view returns (uint256, string memory) {
        uint256 i = find(id);
        return (users[i].id, users[i].name);
    }

    function update(uint256 id, string memory name) public {
        uint256 i = find(id);
        users[i].name = name;
    }

    function remove(uint256 id) public {
        uint256 i = find(id);
        delete users[i];
    }

    function find(uint256 id) public view returns (uint256) {
        for (uint256 i = 0; i < users.length; i++) {
            if (users[i].id == id) {
                return i;
            }
        }
        revert("User does not exist!");
    }
}

