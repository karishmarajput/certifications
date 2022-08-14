pragma solidity >=0.5.0;
contract Storing {
    uint public blockcount=0;
    struct HashMake{
        uint id;
        string hash;
    }
    mapping(uint => HashMake ) public tasks;
    constructor() public {
        createHash(1020226,'abcdef');
    }
    function createHash(uint _id,string memory _hash) public {
        blockcount=blockcount+1;
        tasks[_id]=HashMake(_id,_hash);
    }

}