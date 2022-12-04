// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "./DCStorage.sol";
import "./safemath.sol";
import "./Organization.sol";
import "./Membership.sol";

contract Direct is Membership{

  string public name = "Crypto Box Direct";
  uint public directFileCount = 0;

  mapping(uint => DirectFile) public directfiles;

  mapping(address => uint[]) public addressToFileIds;
  
  struct DirectFile{
    uint fileId;
    string fileHash;
    uint fileSize;
    string fileType;
    string fileName;
    string fileDescription;
    uint uploadTime;
    address payable uploader;
    address reciever;
    bool isOneTimeLink;
  }

  event DirectFileUploaded(
    uint fileId,
    string fileHash,
    uint fileSize,
    string fileType,
    string fileName,
    string fileDescription,
    uint uploadTime,
    address payable uploader,
    address reciever,
    bool isOneTimeLink
  );

  constructor() public {
  }

  function uploadDirectFile(string memory _fileHash, uint _fileSize, string memory _fileType, string memory _fileName, string memory _fileDescription, address _reciever, bool _isOneTimeLink) public {
    require(bytes(_fileHash).length > 0);
    require(bytes(_fileType).length > 0);
    require(bytes(_fileName).length > 0);
    require(bytes(_fileDescription).length > 0);
    require(msg.sender != address(0));
    require(_fileSize > 0);
    require(_reciever == address(_reciever));
    directfiles[directFileCount] = DirectFile(directFileCount, _fileHash, _fileSize, _fileType, _fileName, _fileDescription, now, msg.sender, _reciever, _isOneTimeLink);
    addressToFileIds[_reciever].push(directFileCount);
    directFileCount++;
    emit DirectFileUploaded(directFileCount, _fileHash, _fileSize, _fileType, _fileName, _fileDescription, now, msg.sender, _reciever, _isOneTimeLink);
  }

  function currentUserFileIds() external view returns(uint [] memory) {
    return addressToFileIds[msg.sender];
  }

  function fileDelete(uint id) public {
    bool startDelete = false;
    for(uint i = 0; i < addressToFileIds[msg.sender].length - 1; i++){
        if(addressToFileIds[msg.sender][i] == id){
            startDelete = true;
        }
        if(startDelete){
            addressToFileIds[msg.sender][i] = addressToFileIds[msg.sender][i + 1];
        }
    }
    delete addressToFileIds[msg.sender][addressToFileIds[msg.sender].length - 1];
    addressToFileIds[msg.sender].length--;
    delete directfiles[id];
  }
  
}


