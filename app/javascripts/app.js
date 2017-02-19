var app = angular.module('appStoreApp', ['ngRoute']);
console.log('app');

//app.config(function ($locationProvider) {
// $locationProvider.html5Mode(true);
//});

app.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/store.html',
    controller: 'StoreController'
  })
  .when('/admin', {
    templateUrl: 'views/admin.html',
    controller: 'AdminController'
  })
  .when('/affiliate', {
    templateUrl: 'views/affiliates.html',
    controller: 'AffiliateController'
  })
  
  .otherwise({redirectTo: '/'});
});

app.service('productListService',function($q, $timeout){
	accounts = web3.eth.accounts;
	account = accounts[0];
	this.products = [];
	initUtils(web3);
    var self = this;
	this.collectProducts = function() {
		console.log('Collecting products');
		AppStore.deployed().count.call()
			.then(function (count) {
				console.log('Count products'+count.valueOf());
				if (count.valueOf() > 0) {
					for (var i = 0; i < count.valueOf(); i++) {
						AppStore.deployed().ids(i)
							.then(function (id) {
								//console.log(id.valueOf());
								return AppStore.deployed().products(id.valueOf())
									.then(function (values) {
										$timeout(function () {
											self.products.push({
												id: id.valueOf(),
												name: values[0],
												price: values[1].valueOf(),
												affiliate_name: values[2],
											affiliate_id: values[3].valueOf()
											});
											
										});
										
									})
									.catch(function (e) {
										console.error(e);
									});
							})
							.catch(function (e) {
								console.error(e);
							});
					}
					
					
				}
				return $q.all(self.products);
			});

	};

    this.collectProducts();

});

app.service('affiliateListService',function($q, $timeout){
	accounts = web3.eth.accounts;
	account = accounts[0];
	this.affiliates = [];
	initUtils(web3);
    var self = this;
	this.collectAffiliates = function() {
		console.log('Collecting affiliates');
		AppStore.deployed().affiliate_count.call()
			.then(function (count) {
				console.log('Affiliate count:' + count.valueOf());
				if (count.valueOf() > 0) {
					for (var i = 0; i < count.valueOf(); i++) {
						AppStore.deployed().affiliate_ids(i)
							.then(function (id) {
								//console.log(id.valueOf());
								return AppStore.deployed().affiliates(id.valueOf())
									.then(function (values) {
										$timeout(function () {
											self.affiliates.push({
												id: id.valueOf(),
												name: values[0],
												address: values[1].valueOf()
											});
											
										});
										
									})
									.catch(function (e) {
										console.error(e);
									});
							})
							.catch(function (e) {
								console.error(e);
							});
					}
					
					
				}
				return $q.all(self.affiliates);
			});

	};

    this.collectAffiliates();

});

app.directive("storeProducts", function(){
	return {
		templateUrl: 'directives/storeproducts.html',
		replace: true,
		scope: {
			productObject: "=",
			//currency: "=",
			buyProductFunction : "&"
		}
	}
});
app.directive("adminProducts", function(){
	return {
		templateUrl: 'directives/adminproducts.html',
		replace: true,
		scope: {
			productObject: "=",
			deleteProductFunction: "&"
		}
	}
});

app.directive("adminAffiliates", function(){
	return {
		templateUrl: 'directives/adminaffiliates.html',
		replace: true,
		scope: {
			affiliateObject: "=",
			deleteAffiliateFunction: "&"
		}
	}
});

