const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "product",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        //initialValue: 41,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        //unique: true, no va x que duplicamos muchos nombres
        allowNull: false,
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      minimun_age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaulValue: 0,
      },
      price: {
        type: DataTypes.FLOAT(2),
        defaulValue: 0,
      },
      image: {
        // FALTA REDEFINIR EL DEFAULT VALUE DE JUGUETES ESTA HOTEL
        type: DataTypes.STRING,
        defaultValue:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxik8f-0VdGyTPqLlOxXhJOHPms35wKycNT37kSN7_e-d7Bt3bOYslLO_BbD0ySMLvGsg&usqp=CAU",
      },
      product_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
