const express = require("express");
const app = express();
const qrcode = require("qrcode-terminal");
const { Client } = require("whatsapp-web.js");

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}` + `/index.html`);
});

app.get("/whatsapp", (req, res) => {
  const client = new Client();
  console.log("whsatsapp");

  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });

    console.log(qr);

    const codigo2 = {
      id: 1,
      codigo_rq: qr,
    };
    console.log(codigo2);
    res.send(codigo2);
  });

  client.on("ready", () => {
    console.log("Client is ready!");
  });

  client.initialize();

  client.on("message", (message) => {
    console.log(message);
    // if (msg.body == '!hola') {
    //     msg.reply('response hola');
    // }
    message.reply("new message");
  });
});

app.listen(3000, () => {
  console.log("servidor iniciado");
});
