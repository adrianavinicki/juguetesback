
const {Router} = require("express");
const {createOrder} = require('../controllers/PostOrder');
const {getAllOrders} = require('../controllers/getAllOrders');
const {modifyOrder} = require('../controllers/putOrder')

const orders = Router();

orders.get('/', getAllOrders);
orders.post('/create', createOrder);
orders.put('/update/:id', modifyOrder);


module.exports = orders;

