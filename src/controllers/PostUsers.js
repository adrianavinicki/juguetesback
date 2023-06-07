const { User } = require("../db.js");



const createUser = async (req, res) => {

  const {  user_id, first_name, last_name, gender, email, delivery_address, mobile, role_id, user_password  } = req.body;

  const uid = req.uid;

     if (!first_name || !last_name || !gender || !email || !delivery_address || !role_id || first_name === "" || last_name === "" || email === "" || delivery_address === ""  )
     return res.status(400).send({message: "Can´t be fields empty"});


  try {
    await User.create({
        user_id: user_id, 
        first_name: first_name,
        last_name: last_name,
        gender: gender,
        email: email,
        delivery_address: delivery_address,
        mobile: mobile,
        role_id: role_id,
        user_password:user_password
    });
    return res.status(201).send({ message: "User created" });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

module.exports = {
    createUser,
};
