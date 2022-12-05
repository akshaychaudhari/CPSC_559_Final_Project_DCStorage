const DCStorage = artifacts.require("DCStorage");
const BuildOrganization = artifacts.require("BuildOrganization");
const Membership = artifacts.require("Membership");
const Direct = artifacts.require("Direct");
const OrganizationUploads = artifacts.require("OrganizationUploads");
const SafeMath = artifacts.require("SafeMath");

module.exports = function(deployer) {
	deployer.deploy(DCStorage);
	deployer.deploy(BuildOrganization);
	deployer.deploy(Membership);
	deployer.deploy(Direct);
	deployer.deploy(OrganizationUploads);
	deployer.deploy(SafeMath);
};
