const {Order, User, Detailorder} = require('../db');

//para crear la orden hay que obtener el id de detaiOrders, sus precios y cantides. Para luego relacionar las DetailOrders con su respectiva order y obtener el totalPrice.
const createOrder = async (req, res, next) => {
   
    try {

        const {totalPrice, userId} = req.body;

        if(!totalPrice || !userId) return res.status(400).json({error:'TotalPrice and userId are required'})

        const user = await User.findByPk(userId);

        if(!user) return  res.status(400).json({error:`There is no user with id ${userId}`})
    
        const newOrder = await Order.create({
            totalprice: totalPrice,
            order_status: 'in process',
        })

        newOrder.setUser(userId);
        
        res.status(200).json(newOrder);
              
    } catch (error) {
        
        res.status(400).json({error:error.message});

    }

};

module.exports = {createOrder};