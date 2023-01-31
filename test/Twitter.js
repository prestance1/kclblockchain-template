const { expect } = require("chai");
const hre = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");
//require("@nomicfoundation/hardhat-chai-matchers");

describe("Twitter", function() {
    it("Should initialise the counter to 0", async function() {
        const Twitter = await hre.ethers.getContractFactory("Twitter");
        const twitter = await Twitter.deploy();
        const result = await twitter.getTotalTweets();
        expect (Number(result)).to.be.equal(0)
    })
    it("Should initialise an empty list of lists", async function() {
        const Twitter = await hre.ethers.getContractFactory("Twitter");
        const twitter = await Twitter.deploy();
        const result = await twitter.getFeed();
        expect(result.length).to.be.equal(0)
    })
    it("Should successfully tweet a message", async function() {
        const Twitter = await hre.ethers.getContractFactory("Twitter");
        const twitter = await Twitter.deploy();
        const [owner, otherAccount] = await ethers.getSigners();
        const message = "Hello world"
        expect(await twitter.tweet(message)).to.emit(twitter, "NewTweet");
        const result = await twitter.getFeed();
        expect(result[0].message).to.be.equal(message);
        expect(result[0].account).to.be.equal(owner.address);
        expect(await twitter.getTotalTweets()).to.be.equal(1);
    })
    it("Should correctly update the amount of tweets", async function() {
        const Twitter = await hre.ethers.getContractFactory("Twitter");
        const twitter = await Twitter.deploy();
        expect(await twitter.getTotalTweets()).to.be.equal(0)
        const message = "Hello world";
        await twitter.tweet(message);
        expect(await twitter.getTotalTweets()).to.be.equal(1);
        await twitter.tweet(message);
        expect(await twitter.getTotalTweets()).to.be.equal(2);
    })

    it("Should revert the transaction if your tweet exceeds the limit", async function() {
        const Twitter = await hre.ethers.getContractFactory("Twitter");
        const twitter = await Twitter.deploy();
        const message = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam tempore non at deleniti corporis ratione aliquid tempora libero nemo excepturi nesciunt dicta possimus minus modi harum consequuntur sunt, impedit suscipit unde quas tenetur. Harum voluptatem ratione libero animi fugit laborum amet consequuntur vel saepe hic, a autem nam nesciunt sit. Quam quidem minima ipsa eligendi, laborum blanditiis, quisquam cumque cum modi nobis iure sunt laboriosam, deleniti dolor hic odit? Exercitationem mollitia adipisci libero amet iusto repudiandae labore. Earum sint perferendis quos laboriosam porro. Ab dolorum nostrum quibusdam porro, laudantium aliquid hic ipsam voluptas cupiditate, aspernatur ut eum repellendus aperiam. Natus placeat atque deserunt necessitatibus dolores fugit, incidunt illo iure commodi distinctio tempora magni ipsam ducimus magnam. Odio, laudantium, obcaecati non, quas excepturi eveniet vitae rerum veniam cumque sunt fugit facere delectus molestias officiis inventore vero doloremque odit est esse. Nisi, expedita ipsam saepe quis facilis sapiente sunt. Aperiam, amet quod mollitia magni vitae quae distinctio et error in optio sit temporibus nulla cumque at voluptatum ea consequuntur! Vero quisquam possimus laboriosam, ex eveniet aperiam nobis iusto ipsum tempore odit ad, corrupti minima doloremque cupiditate aut excepturi sequi fugiat officiis officia eius ab. Ab recusandae culpa modi accusantium distinctio maiores voluptate earum ullam minus fugit repudiandae veniam, nemo sint tempore? Sunt impedit velit ab odit modi sapiente a reprehenderit ratione itaque rerum vitae amet laboriosam nihil, hic deserunt ipsum voluptates soluta assumenda atque fugit. Accusantium, voluptatem? Itaque commodi laborum neque ullam vel! Laudantium tempora iste repellat natus ducimus illo laboriosam accusantium eum sequi vero sint voluptatibus velit perferendis adipisci non, delectus explicabo nostrum, quaerat, voluptates amet! Eveniet tempore reiciendis quae incidunt eaque iusto doloribus doloremque alias a officiis voluptas velit dolore rem, modi omnis consequatur perferendis ea eius itaque voluptates! Quam facilis natus molestias laborum, iste quos. Itaque tempore rerum eius." 
        await expect(twitter.tweet(message)).to.be.reverted;
    })

    it("Should not revert the transaction if your tweet is within the limit", async function() {
        const Twitter = await hre.ethers.getContractFactory("Twitter");
        const twitter = await Twitter.deploy();
        const message = "Test message 123";
        await expect(twitter.tweet(message)).to.not.be.reverted;
    })



})