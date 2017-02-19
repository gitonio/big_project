pragma solidity ^0.4.4;


contract Affiliate  {

	string public name;
	address affiliate_address;
    function Affiliate(string name, address affiliate_address){
        name = name;
        affiliate_address = affiliate_address;
    }



}