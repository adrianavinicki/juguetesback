const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "product",
    {
      id_product: {
        type: DataTypes.INTEGER,
        autoincrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
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
      image: {
        // FALTA REDEFINIR EL DEFAULT VALUE DE JUGUETES ESTA HOTEL
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxik8f-0VdGyTPqLlOxXhJOHPms35wKycNT37kSN7_e-d7Bt3bOYslLO_BbD0ySMLvGsg&usqp=CAU",
        ],
      },
      /*stars: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      review: {
        type: DataTypes.TEXT,
        allowNull: true,
      },*/
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    }
    /* DISCUTIR CON LOS CHICOS SI QUIEREN ELIMINAR EL DATO AUTOMATICO DE
    FECHA DE CREACION DEL PRODUCTO Y SU ULTIMA ACTUALIZACION
    {
      timestamps: false,
    }*/
  );
};