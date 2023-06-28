const {Order, Detailorder} = require('../db');

const getAllOrders = async (req, res) => {
    
    try {
        const orders = await Order.findAll();
    
        !orders
        ? res.status(400).json('There are no Orders')
        : res.status(200).json(orders);

    } catch (error) {
        res.status(400).json({error:error.message});
    }

}

module.exports= {getAllOrders};