require("dotenv").config();
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { TOKEN_AUTH0, GET_USER_AUTH0 } = process.env;

const login = async (req, res) => {

  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "email missing" });
  }

  const clientId = 'FelhvdgmUF99LiuQCHgzaDiCIgIXTbPH';
  const clientSecret = 'wMmAhR55dGv3zBxihF6_GS73u6S5Q6EVVKFvBXpFKxg2ewuNKXydn87wHe4moyr1';
  const audience = 'https://wondertoysworyfinal.us.auth0.com/api/v2/';
  const auth0Domain = 'wondertoysworyfinal.us.auth0.com';
  try {
    //aqui verifica si el user existe en auth0
    const auth0Users = await axios.get(
      `${GET_USER_AUTH0}users-by-email?email=${email}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN_AUTH0}`,
        },
      }
    );

    if(!auth0Users){
      return res.status(404).json({message: "el usuario no existe"});
    }
    const response = auth0Users.data[0];

    if(!password){
      return res.status(404).json({message: "no hay contraseña"});
    };

    //const responseAuthenticate = axios.post(`https://${auth0Domain}/oauth/token`, {
    //  grant_type: 'password',
    //  client_id: clientId,
    //  client_secret: clientSecret,
    //  audience: audience,
    //  username: email,
    //  password: password,
    //})
    //aqui envia un array, tengo que hacerle un destructuring
    return res.status(200).json(response, /*responseAuthenticate*/);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({
        message: "hubo un error en el server, intente mas tarde",
        error,
      });
  }
};

module.exports = { login };
