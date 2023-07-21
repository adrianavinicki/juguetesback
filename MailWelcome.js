require('dotenv').config();

const nodemailer = require('nodemailer');
const fs = require('fs');
const handlebars = require('handlebars');

// Leer el archivo HTML de la plantilla
const source = fs.readFileSync('src/emails/registro.html', 'utf8');

// Compilar la plantilla con Handlebars
const template = handlebars.compile(source);

// Reemplazar las variables en la plantilla con los valores deseados
const replacements = {
    nombre: 'WonderToys'
};
const html = template(replacements);

// Configurar el transportador de correo electrónico
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL || 'wondertoyshenry@gmail.com', // TODO: your gmail account
        pass: process.env.PASSWORD || 'xitlonbnmfnircgh' // TODO: your gmail password
    }
});
// Definir el mensaje de correo electrónico
const mailOptions = {
    from: 'wondertoyshenry@gmail.com', // TODO: email sender
    //to: 'Leandro.brangi@gmail.com; gaova777@utp.edu.co; alexruiz-1999@hotmail.com; Davicova84@gmail.com', // TODO: email receiver
    to: 'trabajokervys@gmail.com', // TODO: email receiver
    subject: 'Bienvenido Wonder Boy!!',
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Bienvenido Wonder Boy</title>
    </head>
    <body>
        ${html}
    </body>
    </html>`
};

// Enviar el correo electrónico
transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Correo electrónico enviado: ' + info.response);
    }
});