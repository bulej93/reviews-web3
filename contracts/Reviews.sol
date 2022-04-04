// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.3;


contract Reviews {

    string public name;

    uint public storeCount = 0;
    uint public reviewsCount = 0;

    mapping(uint => Store) public stores;
    mapping(uint => Review) public reviews;

     struct Store {
         uint id;
        string name;
     }

     struct Review {
         uint id;
         string review;
         address owner;
         uint store;
     }

    constructor() {
        name = 'reviews website';
     }

    function createStore(string memory _name) public {
         require(bytes (_name).length > 0, 'store needs a name');
         storeCount++;
         stores[storeCount] = Store(storeCount, _name);
    }

    function createReviews(string memory _review, uint _id) public {
        //we need to get the store
        Store memory _store = stores[_id];
        require(_store.id > 0 && _store.id <= storeCount, 'doesnt work');
        require(bytes(_review).length > 0, 'reviews cannot be empty');
        address _owner = msg.sender;
        reviewsCount ++;
        //add reviews to store reviews mapping 
        reviews[reviewsCount] = Review(reviewsCount, _review, _owner, _store.id );
    }
}