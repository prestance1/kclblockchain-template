const ethers = require('ethers')

const wallet = ethers.Wallet.createRandom();


console.log("Public Key: ", wallet.address)
console.log("Private key: ", wallet.privateKey)
