var app = angular.module("appStoreApp");

app.controller("AdminController", function($scope, $timeout, $q, productListService){
	console.log("AdminController");
	console.log(productListService);
	$scope.accounts = web3.eth.accounts;
	$scope.account = $scope.accounts[0];
	$scope.products = productListService.products;
	initUtils(web3);

	$scope.deleteProduct = function(newId) {
		console.log('deleting:'+newId);
		AppStore.deployed()
		.removeProduct(newId,{ from: $scope.account, gas: 3000000 } )
					.then(function (tx) {
				return web3.eth.getTransactionReceiptMined(tx);
			})
			.then(function (receipt) {
				console.log('splice newid'+$scope.products[0].id)
				var index = -1 
				for(var i = 0, len = $scope.products.length; i < len; i++){
					if ($scope.products.id = newId) {
						index = i;
						break;
					}
				}

				//var index = $scope.products.indexOf({id:newId});
				if (index > -1) {
					console.log('splcing');
				$scope.products.splice(index,1);
				$scope.$apply();
			};
				console.log("product deleted");
			});

	};

	$scope.addProduct = function(newId, newName, newPrice, newAffiliate, newAffiliateId) {

		AppStore.deployed()
			.addProduct(
				newId,
				newName,
				newPrice,
				newAffiliate,
				newAffiliateId,
				{ from: $scope.account, gas: 3000000 })
			.then(function (tx) {
				return web3.eth.getTransactionReceiptMined(tx);
			})
			.then(function (receipt) {
				console.log('newId'+ newId);
				var o = {id: newId.toString(), name: newName, price: newPrice.toString(), affiliate_name: newAffiliate, affiliate_id: newAffiliateId.toString()};
				console.log(o);
				$scope.products.push(o);
				$scope.$apply();
				console.log($scope.products);
				console.log("product added");
			});
	};


	$scope.$watch('products',function(){
		productListService.products = $scope.products;
	});


});
