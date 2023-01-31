const { expect } = require("chai");
const hre = require("hardhat");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");



describe("Task 2", () => {
    it("Should successfully push an tweet to feed", async () => {
        const Twitter = await hre.ethers.getContractFactory("Twitter");
        const twitter = await Twitter.deploy();
        await twitter.tweet('hello world');
        const [owner, otherAccount] = await ethers.getSigners();
        const post = (await twitter.getFeed())[0];
        expect(post.account).to.be.equal(owner.address);
        expect(post.message).to.be.equal('hello world');
        expect(Number(post.timestamp)).to.be.equal(await time.latest())
    })

    it("Should emit a NewTweet Event", async () => {
        const Twitter = await hre.ethers.getContractFactory("Twitter");
        const twitter = await Twitter.deploy();
        const [owner, otherAccount] = await ethers.getSigners();
        expect(await twitter.tweet('hello world')).to.emit(twitter, "NewTweet").withArgs(owner.address, time.latestBlock, 'hello world')
    })
})
