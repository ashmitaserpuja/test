const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const DATA_PATH = path.join(__dirname, '../../data/items.json');

let cacheStats = null; //saving the cache stats in this for reuse 

function calculateState(callback){
  fs.readFile(DATA_PATH, (err, raw) => {
    if (err) return callback(err);

    const items = JSON.parse(raw);
    // Intentional heavy CPU calculation
    const stats = {
      total: items.length,
      averagePrice: items.reduce((acc, cur) => acc + cur.price, 0) / items.length
    };

    cacheStats = stats;
    callback(null, stats);
  })
}

//check if the file has changed every
fs.watchFile(DATA_PATH, () => {
  console.log('File has been changed so removing cache');
  cacheStats = null; // if file has been changed remove the saved cache data 
});

// GET /api/stats
router.get('/', (req, res, next) => {
  if (cacheStats){
    return res.json(cacheStats);
  }

  calculateState((err, stats) => {
    if(err) return next(err);
    res.json(stats);
  });
})

module.exports = router;