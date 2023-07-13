const { User } = require("../db");

const userFavs = async (req, res, next) => {
  const { id } = req.params;
  const { productId, val } = req.body;

  try {
    const user = await User.findByPk(id);
    if (user) {
      const aux = user.favProductId;
      if (val) {
        if (!aux.includes(productId)) {
          const favProduct = await user.update({
            favProductId: [...aux, productId],
          });
          return res.status(200).json(favProduct);
        } else {
          const favProduct = await user.update({
            favProductId: [...aux],
          });
          return res.status(200).json(favProduct);
        }
      } else {
        if (aux.includes(productId)) {
          const favProduct = await user.update({
            favProductId: aux.filter((e) => e !== productId),
          });
          return res.status(200).json(favProduct);
        } else {
          const favProduct = await user.update({
            favProductId: [...aux],
          });
          return res.status(200).json(favProduct);
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

const getAllFavs = async (req, res, next) => {
  const { id } = req.params;
  try {
    const userFavProducts = await User.findByPk(id, {
      attributes: ["favProductId"],
    });
    res.status(200).json(userFavProducts);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  userFavs,
  getAllFavs,
};

