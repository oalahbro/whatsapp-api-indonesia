const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const port = 3000
const { MessageMedia } = require('whatsapp-web.js');
const fetch = require('node-fetch');


app.use(bodyParser.urlencoded({ extended: false }));

const generateRandomString = (myLength) => {
    const chars =
      "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
    const randomArray = Array.from(
      { length: myLength },
      (v, k) => chars[Math.floor(Math.random() * chars.length)]
    );
  
    const randomString = randomArray.join("");
    return randomString;
  };
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true },

});
client.initialize();
client.on('qr', (qr) => {
    qrcode.generate(qr);
}); ``
client.on('authenticated', () => {
    console.log('AUTHENTICATED');
});
client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessful 
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', () => {
    
    console.log('Client is ready!');
});

app.post('/kirim', async (req, res) => {

    let pesan = req.body.pesan
    let nomer = req.body.nomer
    let nama = generateRandomString(10)
    let url = req.body.link
    
        // res.send(peslet sessionData;a
    res.send(req.body)
    const response = await fetch(url);
    const buffer = await response.buffer();
        fs.writeFile('./image/'+nama+'.jpg', buffer, () => {
            let media = MessageMedia.fromFilePath('./image/'+nama+'.jpg')
            client.sendMessage(nomer + "@c.us", media, { caption: pesan })
            console.log('finished downloading!')});

    // const media = await MessageMedia.fromUrl('https://www.iasgurukul.com/images/abhinav.png',);


    // //console.log(req.body)
    console.log(nomer + "@c.us")
    console.log(pesan)
    console.log(url)
    // res.sendStatus(200);
})

app.listen(port, () => {
        
      
    console.log(`Example app listening on port ${port}`)
})
client.on('message', msg => {
    if (msg.body == '/ping') {
        msg.reply('pong');
    }
});

