const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "rating",
    {
      stars: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      review: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
     
    }
    /* DISCUTIR CON LOS CHICOS SI QUIEREN ELIMINAR EL DATO AUTOMATICO DE
    FECHA DE CREACION DEL PRODUCTO Y SU ULTIMA ACTUALIZACION
    {
      timestamps: false,
    }*/
  );
};
