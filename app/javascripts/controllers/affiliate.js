var app = angular.module("appStoreApp");

app.controller("AffiliateController", function($scope, $timeout, $q, affiliateListService){
	console.log("AffiliateController");
	console.log("affiliateListService:")
	console.log(affiliateListService);
	$scope.accounts = web3.eth.accounts;
	$scope.account = $scope.accounts[0];
	$scope.affiliates = affiliateListService.affiliates;
	initUtils(web3);

	
	$scope.$watch('affiliates',function(){
		affiliateListService.affiliates = $scope.affiliates;
	});

	$scope.addAffiliate = function(newId, name, address) {
		AppStore.deployed()
			.addAffiliate(
				newId,
                name,
                address,
				{ from: $scope.account, gas: 3000000 })
			.then(function (tx) {
				return web3.eth.getTransactionReceiptMined(tx);
			})
			.then(function (receipt) {
				console.log(receipt);
				console.log('newId'+ newId);
				var o = {id: newId.toString(), name: name, address:address};
				console.log('new object'+ o);
				$scope.affiliates.push(o);
				$scope.$apply();
				console.log('$scope.affiliates'+$scope.affiliates);
				console.log("Affiliate added");
			});

	};

	$scope.deleteAffiliate = function ( id){
		console.log('todo: deleteAffiliate');
		console.log('affiliate id:'+id);
	}

});
