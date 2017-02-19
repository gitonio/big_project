module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.autolink();
  deployer.deploy(MetaCoin);
  //deployer.deploy(AppStore);
  deployer.deploy(AppStore, web3.eth.accounts[1], { from: web3.eth.accounts[0], gas: 3000000 });

  //deployer.deploy(Warehouse)
  //	.then(function () {
  //		return deployer.deploy(AppStore, Warehouse.address);
  //	});  
  
};
