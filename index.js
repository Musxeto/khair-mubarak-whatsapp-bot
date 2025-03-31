const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Create a new WhatsApp client
const client = new Client({
    authStrategy: new LocalAuth() // Saves authentication to prevent repeated QR scans
});

// Generate QR Code for authentication
client.on('qr', (qr) => {
    console.log('Scan this QR code with your phone:');
    qrcode.generate(qr, { small: true });
});

// Once authenticated, the bot is ready
client.on('ready', () => {
    console.log('WhatsApp bot is ready!');
});

// Listen for incoming messages
client.on('message', async (message) => {
    console.log(`Received message: ${message.body}`);

    if (message.body.toLowerCase() === 'hi') {
        message.reply('Hello! This is an automated response.');
    }
});

// Start the bot
client.initialize();
