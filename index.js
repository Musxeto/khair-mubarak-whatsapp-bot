const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    console.log('Scan this QR code with your phone:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', async () => {
    console.log('WhatsApp bot is ready!');
    
    const chats = await client.getChats();
    for (let chat of chats) {
        let messages = await chat.fetchMessages({ limit: 50 });

        if (messages.some(msg => containsKhair(msg.body))) continue;

        for (let message of messages) {
            if (!message.isRead && containsEidGreeting(message.body)) {
                await message.reply(getEidReply());
                break;
            }
        }
    }
});

client.on('message', async (message) => {
    console.log(`Received message: ${message.body}`);

    const chat = await message.getChat();
    const messages = await chat.fetchMessages({ limit: 50 });

    if (messages.some(msg => containsKhair(msg.body))) return;

    if (containsEidGreeting(message.body)) {
        await message.reply(getEidReply());
    }
});
function containsEidGreeting(text) {
    const eidKeywords = ["eid", "eid mubarak", "happy eid", "eid ul fitr", "eid ul adha", "mubarak"];
    return eidKeywords.some(keyword => text.toLowerCase().includes(keyword));
}

function containsKhair(text) {
    return text.toLowerCase().includes("khair");
}
function getEidReply() {
    return `Khair Mubarak! 🌙✨\nاللهم بارك لنا في عيدنا واجعله مليئًا بالخير والبركات.\nMay this Eid bring you joy and countless blessings!`;
}
client.initialize();
