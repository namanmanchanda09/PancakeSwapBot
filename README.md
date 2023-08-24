# PancakeSwapBot
Script that buys a token for example - *CAKE2* whenever liquidity is provided to the pool.

The following is written for *Binance Test SmartChain*.

### Steps to run the bot (*v16.20.2* node version used)

1. Install the dependencies
   
`npm install`

2. Create a `.env` file in the root and add the following

```
PRIVATE_KEY=<no quotes>
ADDRESS=<no quotes>
RPC_URL=<with quotes>
```

4. Run the cron job

`node cron-ping.js`

### File structure

- `cron-ping.js` is the entry point of the bot
- `index.js` contains the logic for the contract interaction
