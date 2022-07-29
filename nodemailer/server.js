const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3333;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
  const { email, name, description, date } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "arthurcd50@gmail.com",
      pass: "amrydhbiefigvwsw",
    },
  });

  const mailOptions = {
    from: "arthurcd50@gmail.com",
    to: `${email}`,
    subject: `Agendamento para ${date}`,
    text: `Voce tem um agendamento para ${date} com o seguinte nome: ${name} e descricao: ${description}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
