const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "product",
    {
      //ID : Que lo defina el sistema
      id_product: {
        type: DataTypes.UUIDV4,
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
          "https://img.freepik.com/vector-gratis/edificio-hotel-flat_23-2148162501.jpg?w=2000",
        ],
      },
      stars: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      review: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
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
