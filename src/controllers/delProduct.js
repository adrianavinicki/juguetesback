const { Product } = require("../db");

async function deleteProduct(req, res) {
    const { id } = req.params;
  
    try {
      const product = await Product.findByPk(id);
  
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
  
      await product.destroy();
  
      return res.status(204).end();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }


  module.exports = {
    deleteProduct,
  };