// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Array {
    struct Student {
        uint256 id;
        string name;
    }
    Student[] public students;
    uint256 public nextId = 1;

    function insert(string memory name) public {
        students.push(Student(nextId, name));
        nextId++;
    }

    function read(uint256 id) public view returns (uint256, string memory) {
        uint256 i = find(id);
        return (students[i].id, students[i].name);
    }

    function find(uint256 id) public view returns (uint256) {
        for (uint256 i = 0; i < students.length; i++) {
            if (students[i].id == id) {
                return i;
            }
        }
        revert("User does not exist!");
    }
   
}