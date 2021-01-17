const express = require('express');
const router = express.Router();
const Trade = require('../models/trades.js');

// create a trade
router.post('/', async(req, res)=>{

    const trade = {
        type: req.body.type,
        user_id: req.body.user_id,
        symbol: req.body.symbol,
        shares: req.body.shares,
        price: req.body.price,
        timestamp: req.body.timestamp
    }

    const new_trade = await Trade.create(trade);
    res.status(201).json(new_trade.dataValues);
});

// get all trades
router.get('/', async(req, res) => {

    let trades;
    if( req.query.type && req.query.user_id){
        trades = await Trade.findAll({
            where: {
                type: req.query.type,
                user_id : req.query.user_id
            }
        });
    } else if(req.query.type){
        trades = await Trade.findAll({
            where: {
                type: req.query.type
            }
        });
    } else if(req.query.user_id){
        trades = await Trade.findAll({
            where: {
                user_id: req.query.user_id
            }
        });
    } else{
        trades = await Trade.findAll({});
    }
    
    for(var i=0;i<trades.length;i++){
        trades[i] = await trades[i].dataValues;
    }
    
    res.status(200).json(trades);
});

// get a trade with id
router.get('/:id', async(req, res) => {
    const id = req.params.id;
    const trade = await Trade.findOne({id});
    if(trade){
        res.status(200).json(trade.dataValues);
    }else{
        res.status(404).send("ID not found");
    }
});

// delete a trade
router.delete('/:id', async(req, res) => {
    res.sendStatus(405);
});

// edit a trade
router.put('/:id', async(req, res) => {
    res.sendStatus(405);
});

// pathch request
router.patch('/:id', async(req, res) => {
    res.sendStatus(405);
});


module.exports = router;
