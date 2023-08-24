/**
 * CRON SCRIPT - to continuously run the MAIN script
 */


const cron = require('node-cron');
const main = require('./index.js');

// Calling "main()" every minute
let task = cron.schedule('* * * * *', function() {
    main();
  });



