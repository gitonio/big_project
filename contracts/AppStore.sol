pragma solidity ^0.4.4;
import "Owned.sol";
import "MultiOwned.sol";
//import "WarehouseI.sol";
import "Affiliate.sol";
import "MetaCoin.sol";

contract AppStore is MultiOwned {
	struct Product {
		string name;
		uint price;	
		string affiliate_name;
		uint affiliate_id;
	}

	mapping(uint => Product) public products;
	uint[] public ids;
	address public warehouse;

	uint[] public affiliate_ids;
	
	string[] public affiliate_names;
	address[] public affiliate_addresses;

	//mapping(uint => Affiliate) public affiliates;
	struct Affiliate_info {
		string name;
		address affiliate_address;
	}

	
	mapping(uint => Affiliate_info) public affiliates;

   	event LogAffiliateAdded(uint id, string name, address affiliate_address);


	event LogProductAdded(uint id, string name, uint price, string affiliate_name);
	event LogProductPurchased(uint id, uint affiliate_id, address customer);

	function AppStore(address _owner2) 
		MultiOwned(_owner2) {
	}

	function count() returns (uint length) {
		return ids.length;	
	}

	function affiliate_count() returns (uint length) {
		return affiliate_ids.length;	
	}

	function getAffiliateAddress(uint affiliate_id) returns(address affiliate_address) {
		return affiliates[affiliate_id].affiliate_address;
	}

	function addProduct(uint id, string name, uint price, string affiliate_name, uint affiliate_id)
		fromOwner
		returns (bool successful) {
		products[id] = Product({
			name: name,
			price: price,
			affiliate_name: affiliate_name,
			affiliate_id: affiliate_id
		});
		ids.push(id);
		LogProductAdded(id, name, price, affiliate_name);
		return true;
	}

	function removeProduct(uint id)
		fromOwner
		returns (bool successful) {
			uint index = indexOf(id, ids);
			for (uint i  = index ; i<ids.length -1; i++){
				ids[i] = ids[i+1];
			}
			delete ids[ids.length-1];
			ids.length--;
			return true;
		}
	
	function indexOf(uint id, uint[] arr) returns (uint index){
		for (uint i = 0; i< arr.length; i++){
			if(arr[i] == id) return i;
		}
	}


	function buyProduct(uint id, uint affiliate_id) payable
		returns (bool successful) {
		if (msg.value < products[id].price)	{
			throw;
		}
		//if (!WarehouseI(warehouse).ship(id, msg.sender)) {
		//	throw;
		//}
		if (!	affiliates[affiliate_id].affiliate_address.send( products[id].price/2 )){
			throw;
		}
		LogProductPurchased(id, affiliate_id, msg.sender);
		return true;
	}

	function coBuyProduct(uint id, uint affiliate_id) payable isConfirmed
		returns (bool successful) {
		if (msg.value < products[id].price)	{
			throw;
		}
		//if (!WarehouseI(warehouse).ship(id, msg.sender)) {
		//	throw;
		//}
		if (!	affiliates[affiliate_id].affiliate_address.send( products[id].price/2 )){
			throw;
		}
		LogProductPurchased(id, affiliate_id, msg.sender);
		return true;
	}

	function addAffiliate(uint id, string name, address affiliate_address)
		fromOwner
		returns (bool successful) {
			affiliate_names.push(name);
			affiliate_ids.push(id);
			affiliate_addresses.push(new Affiliate(name, affiliate_address));
			affiliates[id] = Affiliate_info({
				name: name,
				affiliate_address: affiliate_address
			});
			LogAffiliateAdded(id, name, affiliate_address);
			return true;
		}

	//function getAffiliateName(address affiliate_address) returns (string name) {
	//	Affiliate aff = Affiliate(affiliate_address);
	//	return aff.name;
	//}
}