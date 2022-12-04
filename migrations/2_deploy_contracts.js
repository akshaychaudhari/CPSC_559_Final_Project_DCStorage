const DCStorage = artifacts.require("DCStorage");
const BuildOrganization = artifacts.require("BuildOrganization");
const Membership = artifacts.require("Membership");

module.exports = function(deployer) {
	deployer.deploy(DCStorage);
	deployer.deploy(BuildOrganization);
	deployer.deploy(Membership);
};
