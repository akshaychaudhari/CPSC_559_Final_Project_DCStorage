const DCStorage = artifacts.require("DCStorage");

module.exports = function(deployer) {
	deployer.deploy(DCStorage);
};
