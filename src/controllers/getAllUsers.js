/* const { User } = require('../db');
const { Op } = require("sequelize");
const { onlyLettersCheck, onlyDateCheck, onlyNumbersCheck, isEmailCheck, httpsLinkCheck, statusCheck, priviligeCheck } = require('../helpfuls/regex');
const loadUsers = require('../data/users.json');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const cloudinary = require('cloudinary').v2;


//! GET show all users Users --------------
// tema de como debo enviar el res.status del error con el next
// terminar de arreglar linea 15 next(err);
async function getAllUsers(req, res, next) {
    try {
        const allUser = await User.findAll({});
        return res.status(200).send(allUser)
    } catch (err) {
        next(err);
    };
};

async function DisableUser(req, res) {
    try {
        let { email } = req.body;
        const user = await User.findOne({
            where: {
                email: email
            }
        });
        if (user.status === "active") {
            user.update({ status: "disabled" });
        } else if (user.status === "disabled") {
            user.update({ status: "active" });
        }
        res.status(201).json(user);
        //res.send(user);
    } catch (err) {
        res.status(401).json({ message: err });
    };
};
//!-------------- Modifi user -------------------------------  
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
 });
 async function ModifyUser(req, res) {
    try {
       let { email } = req.params;
       let { id_user, first_name, last_name, gender, delivery_address, mobile, role_id, user_status, purchase_history, user_password } = req.body;
 
       const user = await User.findOne({
          where: {
             email: email
          }
       });
 
       if (!user) {
          return res.status(404).json({msg: "user not found"});
       }
 
       let imageUrl;
 
       if (req.file) {
          // Si se proporcionó un archivo, subirlo a Cloudinary y obtener la URL de la imagen
          const result = await cloudinary.uploader.upload(req.file.path,{
            public_id: user.email
          });
          imageUrl = result.secure_url;
       } else if (req.body.image) {
          // Si se proporcionó una URL de imagen, subirla a Cloudinary y obtener la URL de la imagen
          const result = await cloudinary.uploader.upload(req.body.image,{
            public_id: user.email
          });
          imageUrl = result.secure_url;
       }
 
       // Actualizar la información del usuario y la URL de la imagen, si corresponde
       user.update({
          id_user: id_user,
          first_name: first_name,
          last_name: last_name,
          gender: gender,
          delivery_address: delivery_address,
          mobile: mobile,
          role_id:role_id,
          user_status: user_status,
          purchase_history:purchase_history,
          user_password:user_password
       });
 
       // Responder con el usuario actualizado
       res.status(201).json(user);
    } catch (err) {
       res.status(401).json({ message: err });
    };
 }



Module.exports = {
    getAllUsers,
    DisableUser,
    ModifyUser
}; */