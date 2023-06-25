const {Order} = require('../db');

const modifyOrder = async (req, res) => {
   
    try {
        const {totalPrice, status} = req.body;
        const {id} = req.params;
    
        if(!id) return res.status(400).json({error:'Id is needed'});
    
        const order = await Order.findByPk(id);
    
        if(!order) return res.status(400).json({error:'Non-existent Order'});
    
        let modifications = {};
    
        if(totalPrice) {
            modifications = {
                ...modifications,
                totalprice: totalPrice
            }
        };
        if(status) {
            modifications = {
                ...modifications,
                order_status: status
            }
        };
       
        let modifiedOrder = await order.update(modifications);
    
        res.status(201).json(modifiedOrder)
        
    } catch (error) {
        res.status(400).json({error:error.message});
    };
    
};

module.exports = {modifyOrder};