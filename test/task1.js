const { expect } = require("chai");
const hre = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");


describe("Task 1", () => {
    it("Should initialise an empty list of tweets" ,async () => {
        const Twitter = await hre.ethers.getContractFactory("Twitter");
        const twitter = await Twitter.deploy();
        expect(await twitter.getFeed()).to.be.instanceOf(Array)
        expect((await twitter.getFeed()).length).to.be.equal(0)

    })
})