const DCStorage = artifacts.require("DCStorage");
const BuildOrganization = artifacts.require("BuildOrganization");
const Membership = artifacts.require("Membership");
const Direct = artifacts.require("Direct");
const OrganizationUploads = require("OrganizationUploads");
const SafeMath = require("SafeMath");

module.exports = function(deployer) {
	deployer.deploy(DCStorage);
	deployer.deploy(BuildOrganization);
	deployer.deploy(Membership);
	deployer.deploy(Direct);
	deployer.deploy(OrganizationUploads);
	deployer.deploy(SafeMath);
};
