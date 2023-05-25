const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "price",
    {
      price_id: {
        type: DataTypes.INTEGER,
        autoincrement: true,
        allowNull: false,
        primaryKey: true,
      },
      price: {
        type: DataTypes.FLOAT(2),
        defaulValue: 0,
      },
    },
    {
      timestamps: false,
    }
  );
};
