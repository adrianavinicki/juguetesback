require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modeloss
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Product, Orderdetail, Order, Payment, Rating, Stock, User } =
  sequelize.models;

// Relacion productos/rating
Product.hasMany(Rating);
Rating.belongsTo(Product);
//relacion entre user/rating
User.hasMany(Rating, { as: "ratings", foreignKey: "user_id" });
Rating.belongsTo(User, { foreignKey: "user_id" });
// relacion user/productos favoritos
User.belongsToMany(Product, { through: "favoritos" });
Product.belongsToMany(User, { through: "favoritos" });
// relacion producto/stock
Product.belongsTo(Stock);
Stock.belongsTo(Product, { foreignKey: "id_product" });
// relacion payment/order
Payment.hasOne(Order);
Order.hasOne(Payment);
//relacion producto/orderdetail
Product.hasMany(Orderdetail);
Orderdetail.belongsTo(Product);
//relacion orders/orderdetail
Order.hasMany(Orderdetail);
Orderdetail.belongsTo(Order);
//relacion entre Order_Detail y User
User.hasMany(Orderdetail);
Orderdetail.belongsTo(User);
// relacion usuarios/pagos
User.hasMany(Payment);
Payment.belongsTo(User);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
