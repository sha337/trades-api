const Trade = require('../models/trades.js');

module.exports = {
    async createTrade(req, res){

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
    },

    async getTrades(req, res) {
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
            trades[i] = trades[i].dataValues;
        }
        
        res.status(200).json(trades);
    },

    async getTradeWithID(req, res){
        const id = req.params.id;
        const trade = await Trade.findOne({id});
        if(trade){
            res.status(200).json(trade.dataValues);
        }else{
            res.status(404).send("ID not found");
        }
    },

    async sendStatus405(req, res){
        res.sendStatus(405);
    }
}