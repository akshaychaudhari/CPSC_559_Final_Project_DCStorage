// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.5.0;

import "./DCStorage.sol";
import "./safemath.sol";

contract BuildOrganization is DCStorage{

    using SafeMath for uint256;
    using SafeMath32 for uint32;
    using SafeMath16 for uint16;

    struct Organization {
        uint Id;
        string Name;
        string Description;
        address Owner;
        bool Private;
        uint MemberLimit;
        string Passcode;
        uint createdAt;
    }

    Organization[] public organizations;

    mapping(uint => address) organizationToOwner;

    mapping(address => uint) ownerOrganizationCount;

    function createOrganization(string memory name, string memory description, bool privateBool, uint memberLimit, string memory passcode) public {
        uint id = organizations.length;
        organizations.push(Organization(id, name, description, msg.sender, privateBool, memberLimit, passcode, now));
        organizationToOwner[id] = msg.sender;
        ownerOrganizationCount[msg.sender] = ownerOrganizationCount[msg.sender].add(1);
    }

    function editOrganization(uint id, string memory name, string memory description, bool privateBool, uint memberLimit, string memory passcode) public {
        require(organizationToOwner[id] == msg.sender);
        organizations[id].Name = name;
        organizations[id].Description = description;
        organizations[id].Private = privateBool;
        organizations[id].MemberLimit = memberLimit;
        organizations[id].Passcode = passcode;
    }

    function deleteOrganization(uint id) public {
        require(organizationToOwner[id] == msg.sender);
        delete organizationToOwner[id];
    }

}



