const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const fs = require('fs');
const handlebars = require('handlebars');

// Leer el archivo HTML de la plantilla (asegúrate de tener la ruta correcta)
const source = fs.readFileSync('src/emails/compra.html', 'utf8');

// Compilar la plantilla con Handlebars
const template = handlebars.compile(source);

// Configurar el transportador de correo electrónico
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL || 'wondertoyshenry@gmail.com', // TODO: your gmail account
    pass: process.env.PASSWORD || 'xitlonbnmfnircgh', // TODO: your gmail password
  },
});

// Definir la función para enviar el correo electrónico
const sendCompra = (toEmail) => {
  // Reemplazar las variables en la plantilla con los valores deseados
  const html = template({});

  // Definir el mensaje de correo electrónico
  const mailOptions = {
    from: 'wondertoyshenry@gmail.com', // TODO: email sender
    to: toEmail, // Email receiver will be passed as an argument
    subject: 'Gracias por su Compra!!',
    html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <title>Gracias por Su Compra!!</title>
      </head>
      <body>
          ${html}
      </body>
      </html>`,
  };

  // Enviar el correo electrónico
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Correo electrónico enviado: ' + info.response);
    }
  });
};

// Definir la ruta para el envío de correo
router.post('/sendcompra', (req, res) => {
  const { toEmail } = req.body;

  if (!toEmail) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  sendCompra(toEmail);

  return res.status(200).json({ message: 'Correo electrónico enviado' });
});

module.exports = router;
