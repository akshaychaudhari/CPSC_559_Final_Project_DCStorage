const DCStorage = artifacts.require("DCStorage");
const BuildOrganization = artifacts.require("BuildOrganization");

module.exports = function(deployer) {
	deployer.deploy(DCStorage);
	deployer.deploy(BuildOrganization);
};
