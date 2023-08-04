const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto-js');
const path = require('path'); // Import the 'path' module

const app = express();
app.use(bodyParser.json());

app.post('/encrypt', (req, res) => {
    const plainText = req.body.plainText;
    const encryptionPassword = req.body.encryptionPassword;

    const encrypted = crypto.AES.encrypt(plainText, encryptionPassword).toString();
    res.json({ encryptedText: encrypted });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});




app.post('/decrypt', (req, res) => {
    const encryptedText = req.body.encryptedText;
    const decryptionPassword = req.body.decryptionPassword;
    console.log('Received encryptedText:', encryptedText);
    console.log('Received decryptionPassword:', decryptionPassword);
    const decrypted = crypto.AES.decrypt(encryptedText, decryptionPassword).toString(crypto.enc.Utf8);
    res.json({ decryptedText: decrypted });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
