// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "./DCStorage.sol";
import "./safemath.sol";
import "./Organization.sol";
import "./Membership.sol";
import "./Direct.sol";

contract OrganizationUpload is Direct {

  string public name = "Crypto Box Organization Upload";
  uint public organizationFileCount = 0;

  mapping(uint => OrganizationFile) public organizationfiles;

  mapping(uint => uint[]) public organizationToFileIds;
  
  struct OrganizationFile{
    uint fileId;
    string fileHash;
    uint fileSize;
    string fileType;
    string fileName;
    string fileDescription;
    uint uploadTime;
    address payable uploader;
    uint organizationId;
    bool isFlagged;
  }

  event OrganizationFileUploaded(
    uint fileId,
    string fileHash,
    uint fileSize,
    string fileType,
    string fileName,
    string fileDescription,
    uint uploadTime,
    address payable uploader,
    uint organizationId,
    bool isFlagged
  );

  constructor() public {
  }

  function uploadOrganizationFile(string memory _fileHash, uint _fileSize, string memory _fileType, string memory _fileName, string memory _fileDescription, uint _organizationId, bool _isFlagged) public {
    require(bytes(_fileHash).length > 0);
    require(bytes(_fileType).length > 0);
    require(bytes(_fileName).length > 0);
    require(bytes(_fileDescription).length > 0);
    require(msg.sender != address(0));
    require(_fileSize > 0);
    organizationfiles[organizationFileCount] = OrganizationFile(organizationFileCount, _fileHash, _fileSize, _fileType, _fileName, _fileDescription, now, msg.sender, _organizationId, _isFlagged);
    organizationToFileIds[_organizationId].push(organizationFileCount);
    organizationFileCount++;
    emit OrganizationFileUploaded(organizationFileCount, _fileHash, _fileSize, _fileType, _fileName, _fileDescription, now, msg.sender, _organizationId, _isFlagged);
  }

  function currentOrganizationFileIds(uint id) external view returns(uint [] memory) {
    return organizationToFileIds[id];
  }

  function organizationFileDelete(uint fileId, uint organizationId) public {
    require(msg.sender == organizations[organizationId].Owner);
    bool startDelete = false;
    for(uint i = 0; i < organizationToFileIds[organizationId].length - 1; i++){
        if(organizationToFileIds[organizationId][i] == fileId){
            startDelete = true;
        }
        if(startDelete){
            organizationToFileIds[organizationId][i] = organizationToFileIds[organizationId][i + 1];
        }
    }
    delete organizationToFileIds[organizationId][organizationToFileIds[organizationId].length - 1];
    organizationToFileIds[organizationId].length--;
    delete organizationfiles[fileId];
  }
  
  function toggleFlag(uint fileId, uint organizationId){
    require(msg.sender == organizations[organizationId].Owner);
    if(organizationfiles[fileId].isFlagged == false){
        organizationfiles[fileId].isFlagged = true;
    } else{
        organizationfiles[fileId].isFlagged = false;
    }
  }

}


