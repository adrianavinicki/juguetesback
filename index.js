//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { loadProductsInDB } = require("./src/controllers/loadData.js");
const { conn } = require("./src/db.js");

require("dotenv").config();
const { PORT } = process.env;
//Syncing all the models at once.
//conn.sync({ force: true }).then(async () => {
conn.sync({ force: false }).then(async () => {
  //lo dejamos en true mientras construimos las bases y cargamos, luego va a false para que no borre lo cargado
  server.listen(PORT, async () => {
    //loadProductsInDB(); // eslint-disable-line no-console
    console.log(`listening at ${PORT}`);
  });
});
