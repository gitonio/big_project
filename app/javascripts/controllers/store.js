var app = angular.module("appStoreApp");

app.controller("StoreController", function($scope, $timeout, $q, productListService){
	console.log("storeController");
	console.log(productListService);
	$scope.accounts = web3.eth.accounts;
	$scope.account = $scope.accounts[0];
	$scope.products = productListService.products;
	initUtils(web3);

	
	$scope.$watch('products',function(){
		productListService.products = $scope.products;
	});

	$scope.buyProduct = function(newId, affiliate_id, price, currency) {
		console.log('currency:' + currency);
		console.log('newId:' + newId);
		console.log('affiliate_id:'+affiliate_id)
		console.log('price:' + price);
		if (currency == 'ether') {
			console.log('Paying with ether');
		AppStore.deployed()
			.buyProduct(
				newId,
				affiliate_id,
				{ from: $scope.accounts[1], value: price, gas: 3000000 })
			.then(function (tx) {
				return web3.eth.getTransactionReceiptMined(tx);
			})
			.then(function (receipt) {
				console.log("product purchased");
			});
		} else if (currency = 'meta'){
			console.log('Paying with Meta');
			MetaCoin.deployed()
				.sendCoin(accounts[1],1, {from: accounts[0]});
		}
	};



});
