const express = require('express');
const router = express.Router();
const orderRecord = require('../modules/orders/orderRecord')


router
    .get('/', (req, res) => {
        (async ()=>{
            const orders = await orderRecord.showAll();
                res.json(orders)
        })()
})
    .get('/:id',(req,res) =>{
        (async ()=>{
            const order = await orderRecord.showOne(req.params.id)
            res.json(order);
        })();

})
    .post('/', (req,res) =>{
        (async ()=>{
            const order = new orderRecord({name: req.body.name, date: req.body.date, investorName: req.body.investorName});
            const newId = await order.insert();
           res.send(`${newId}`) ;
        })();

})

    .put('/:id', (req, res) =>{
        (async () =>{
            const order = await orderRecord.showOne(req.params.id);
             order.name = req.body.name;
             order.date = req.body.date;
             order.investorName = req.body.investorName;
             await order.update();
res.json(order);
        })();

})
    .delete('/:id', (req, res) => {
        (async () =>{
            const order = await orderRecord.showOne(req.params.id);
            const id = await order.delete()
            res.json(id);
        })();
    })

module.exports = router;

