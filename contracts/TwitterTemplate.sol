// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;


contract TwitterTemplate {

    event NewTweet(address indexed from, uint256 timestamp, string message);
    struct Tweet {
        address account; // The address of the user who tweeted.
        string message; // The message the user sent.
        uint256 timestamp; // The timestamp when the user tweeted.
    }


    function tweet(string calldata _message) external {
        //to implement
    }

    function getFeed() external view returns (Tweet[] memory) {
        //to implement
    }

    function getTotalTweets() external view returns (uint256) {
        //to implement
    }
}