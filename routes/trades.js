const express = require('express');
const router = express.Router();
const Trade = require('../models/trades.js');
const { createTrade, getTrades, getTradeWithID, sendStatus405 } = require('../controllers/trades.js');

// create a trade
router.post('/', createTrade);

// get all trades
router.get('/', getTrades);

// get a trade with id
router.get('/:id', getTradeWithID);

// delete a trade
router.delete('/:id', sendStatus405);

// edit a trade
router.put('/:id', sendStatus405);

// pathch request
router.patch('/:id', sendStatus405);


module.exports = router;
