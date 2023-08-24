/**
 * Script that buys a token for example - CAKE2 whenever liquidity is provided to the pool.
 * Params (
 *      tokenAddress
 *      privateKey
 *      amountToBuy
 *      noOfBuys
 * )
 */

require('dotenv').config()

const ethers = require("ethers");
const abi = require('./ABI/SmartRouter.json');
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

/**
 * Taking specific value for the above mentioned params to test the script
 * tokenAddress = 0x8d008B313C1d6C7fE2982F62d32Da7507cF43551 (CAKE2)
 * amountToBuy = 10000000000000 wei (0.00001 BnB)
 * noOfBuys = 2
 */

// PANCAKE SWAP & TESTNET SMARTCHAIN ADDRESSES
const SMART_ROUTER = '0xD99D1c33F9fC3444f8101754aBC46c52416550D1';
const WBNB = '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd';
const CAKE2 = '0x8d008B313C1d6C7fE2982F62d32Da7507cF43551';
const noOfBuys = 2;

// INITIALIZE THE NUMBER OF COUNTS
let count = 0;

// MAIN FUNCTION
async function main() {
    if (count == noOfBuys) {
        console.log('NUMBER OF BUYS EXCEEDED');
        return;
    }

    count += 1;

    try {
        // INSTANTIATE ROUTER CONTRACT
        const routerContract = new ethers.Contract(SMART_ROUTER, abi, signer);

        // CHECK THE LIQUIDITY AVAILABILITY
        const getAmountsOut = await routerContract.getAmountsOut(
            '10000000000000',
            [WBNB, CAKE2]
        );

        const cake2Amount = getAmountsOut[1];
        if (cake2Amount == 0) {
            console.log('LIQUIDITY NOT AVAILABLE');
            return;
        }
        const valueToSend = ethers.parseEther('0.00001');

        // SWAP IF ENOUGH LIQUIDITY
        console.log('Executing the swap...');
        const txResponse = await routerContract.swapExactETHForTokens(
            0, // minOutAmount set to 0 for testing purposes
            [WBNB, CAKE2], // path to be followed for the swap
            process.env.ADDRESS, // wallet address to send CAKE2 tokens
            Date.now() + 1000 * 60 * 10, // deadline
            { value: valueToSend } // amount of tBNB to SWAP
        );
        console.log('Transaction Response ', txResponse);
    } catch (e) {
        console.log(e);
    }
}

module.exports = main;

