const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

//NodeMailer -->
app.get("/send-email", async (req, res) => {

  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "d5389ae7310c80",
      pass: "fae4e90fcadcdc"
    }
  });

  //body message email
  var message = {
    from: "noreply@tasklist.com.br",
    to: "taldo123@tasklist.com.br",
    subject: "Recuperar senha",
    text: "Plaintext version of the message",
    html: "<p>Quem ler é bobo</p>"
  };

  transport.sendMail(message, function (err) {
    if (err) {
      return res.status(400).json({
        erro: true,
        mensagem: "Erro: E-mail não enviado!"
      });
    }
    return res.json({
      erro: false,
      mensagem: "E-mail enviado com sucesso!"
    });
  });
});

app.listen(3333, () => {
  console.log("Servidor iniciado na porta 3333: http://localhost:3333");
});

/*const oldPass = document.getElementById('senha-anterior');
const newPass = document.getElementById('nova-senha');
const confirmPass = document.getElementById('confirma-senha');*/

/*const api_response = await fetch('http://localhost:3333/sessions/', options)
if(api_response.status === 200){
  const data = await api_response.json();
  console.log(data);
  localStorage.setItem('token', JSON.stringify(data.token));
} else if(api_response.status === 400){
  console.log('error400');
}*/