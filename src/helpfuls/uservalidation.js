const { User } = require("../db.js");

module.exports = {
  getRoleID: async (role) => {
    const userRoleObject = await User.findOne({
      where: { name: role },
    });
    return userRoleObject.role_id;
  },
  /*getUsersOptionalParameter: (active) => {
    if (active !== undefined);
    return {
      where: {
        active: active,
      },
    };
    return;
  },*/
  getUserID: async (email) => {
    const userID = await User.findAll({ where: { email: email } });
    if (userID.length === 0) {
      console.log("El email ingresado no esta registrado");
    } else {
      //return true;
      return User.user_id;
    }
  },
};
