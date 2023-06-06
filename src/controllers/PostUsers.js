require("dotenv").config();
const { User } = require("../db");

const createUser = async (req, res) => {
    const { /* id_user, */ first_name, last_name, gender, email, delivery_address, mobile, role_id, user_password  } = req.body;

const uid = req.uid;
    if (!first_name || !last_name || !gender || !email || !delivery_address || !role_id || first_name === "" || last_name === "" || email === "" || delivery_address === ""  )
    return res.status(400).send({message: "Can´t be fields empty"});

    try {
      let userFound = await User.findOne({
        where: {
          email: email,
        },
      });
      if (userFound) return { message: "User already exists", status: "error" };
  
      let userCreated = await User.create({
        /* id_user: id_user, */
        first_name: first_name,
        last_name: last_name,
        gender: gender,
        email: email,
        delivery_address: delivery_address,
        mobile: mobile,
        role_id:role_id,
        user_password:user_password
      });
       !userCreated? res.status(400).json({message: "User not created"})
       : res.status(200).json({message:"User created succesfully"});

       

      /* return {      
        userCreated,
        message: "User created succesfully",
        status: "success",
      };
 */

    } catch (error) {
      return { message: error.message, status: "error" };
    }
  };
  
  module.exports = {createUser};