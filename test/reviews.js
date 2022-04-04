const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Reviews contract", function () {
    let Reviews;
    let reviews;
    let owner;
    let addr1;
    let addr2;
    let addrs;
    beforeEach(async function () {
        Reviews = await ethers.getContractFactory("Reviews");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        reviews = await Reviews.deploy();
      });
    
    it("It should deploy", async function () {
    expect(await reviews.name()).to.equal('reviews website')
    });

    it('creates stores', async function() {
        const createstore = await reviews.createStore('bules store')
        expect(await reviews.storeCount()).to.equal(1)
    })

    it('creates reviews', async function() {
        const createstore = await reviews.createStore('bules store')
        const createreviews = await reviews.createReviews('greate store', 1)
        expect(await reviews.reviewsCount()).to.equal(1)
    })

});