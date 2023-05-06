const { Product } = require("../db");

const loadProducts = require("../data/products.json");

//!-------------

async function loadAllModelsInDB() {
  try {
    const emptyProduct = await Product.findAll({});
    if (!emptyProduct) {
      await Product.bulkCreate(loadProducts);
      console.log("Products loaded ok to DB");
    }
    /*await Room.bulkCreate(loadRooms);
    console.log("Rooms loaded ok to DB");
    await Amenities.bulkCreate(loadAmenities);
    console.log("Amenities loaded ok to DB");
    await User.bulkCreate(loadUsers);
    console.log("Users loaded ok to DB");
    await Services.bulkCreate(loadServices);
    console.log("Services loaded ok to DB");
    await Unlocode.bulkCreate(loadUnlocode);
    console.log('Cities local code  loaded ok to DB');
    */
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  loadAllModelsInDB,
};
