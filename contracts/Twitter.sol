// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;


contract Twitter {

    event NewTweet(address indexed from, uint256 timestamp, string message);
    struct Tweet {
        address account; // The address of the user who tweeted.
        string message; // The message the user sent.
        uint256 timestamp; // The timestamp when the user tweeted.
    }

    Tweet[] tweets;
    uint256 totalTweets;


    function tweet(string calldata _message) external {
        require(bytes(_message).length <= 500, "Exceeded limit of 500 characters");
        totalTweets += 1;
        Tweet memory post = Tweet(msg.sender, _message, block.timestamp);
        tweets.push(post);
        emit NewTweet(msg.sender, block.timestamp, _message);
    }

    function getFeed() external view returns (Tweet[] memory) {
        return tweets;
    }

    function getTotalTweets() external view returns (uint256) {
        return totalTweets;
    }
}