// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "./DCStorage.sol";
import "./safemath.sol";
import "./Organization.sol";

contract Membership is BuildOrganization{

    function joinOrganization(uint id) public {
        uint[] memory orgIds = addressToOrganizations[msg.sender];
        for(uint i; i < orgIds.length; i++){
            if(id == orgIds[i]){
                return;
            }
        }
        addressToOrganizations[msg.sender].push(id);
        organizationToAddresses[id].push(msg.sender);
    }

    function exitOrganization(uint id) public {
        uint orgIndex;
        uint memberIndex;
        bool isMember = false;
        bool isMemberConfirm = false;
        uint[] memory orgIds = addressToOrganizations[msg.sender];
        address[] memory memberAddresses = organizationToAddresses[id];
        for(uint i; i < orgIds.length; i++){
            if(id == orgIds[i]){
                orgIndex = i;
                isMember = true;
            }
        }
        for(uint i; i < memberAddresses.length; i++){
            if(msg.sender == memberAddresses[i]){
                memberIndex = i;
                isMemberConfirm = true;
            }
        }
        if(isMember && isMemberConfirm){
            for(uint i = orgIndex; i < orgIds.length - 1; i++){
                addressToOrganizations[msg.sender][i] = addressToOrganizations[msg.sender][i+1];
            }
            delete addressToOrganizations[msg.sender][addressToOrganizations[msg.sender].length - 1];
            addressToOrganizations[msg.sender].length--;
            for(uint i = memberIndex; i < memberAddresses.length - 1; i++){
                organizationToAddresses[id][i] = organizationToAddresses[id][i+1]; 
            }
            delete organizationToAddresses[id][organizationToAddresses[id].length - 1];
            organizationToAddresses[id].length--;
        }
    }

}




