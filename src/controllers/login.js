require("dotenv").config();
const axios = require("axios");
const { TOKEN_AUTH0, GET_USER_AUTH0 } = process.env;

const login = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "email missing" });
  }

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

    const response = auth0Users.data[0];
    //aqui envia un array, tengo que hacerle un destructuring
    return res.status(200).json(response);
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
