const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Create a new WhatsApp client
const client = new Client({
    authStrategy: new LocalAuth()
});

// Generate QR Code for authentication
client.on('qr', (qr) => {
    console.log('Scan this QR code with your phone:');
    qrcode.generate(qr, { small: true });
});

// Once authenticated, the bot is ready
client.on('ready', async () => {
    console.log('WhatsApp bot is ready!');
    
    // Fetch unread messages
    const chats = await client.getChats();
    for (let chat of chats) {
        let messages = await chat.fetchMessages({ limit: 50 }); // Fetch last 50 messages
        for (let message of messages) {
            if (!message.isRead && message.body.toLowerCase().includes('eid')) {
                await message.reply(`Khair Mubarak! 🌙✨\nاللهم بارك لنا في عيدنا واجعله مليئًا بالخير والبركات.\nMay this Eid bring you joy and countless blessings!`);
            }
        }
    }
});

// Listen for incoming messages
client.on('message', async (message) => {
    console.log(`Received message: ${message.body}`);

    if (message.body.toLowerCase().includes('eid')) {
        await message.reply(`Khair Mubarak! 🌙✨\nاللهم بارك لنا في عيدنا واجعله مليئًا بالخير والبركات.\nMay this Eid bring you joy and countless blessings!`);
    }
});

// Start the bot
client.initialize();
