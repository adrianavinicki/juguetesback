const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "order_detail",
    {
      order_detail_id: {
        type: DataTypes.INTEGER,
        autoincrement: true,
        allowNull: false,
        primaryKey: true,
      },
      price: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      order_detail_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      detail_order_status: {
        type: DataTypes.ENUM("active", "inactive"),
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
