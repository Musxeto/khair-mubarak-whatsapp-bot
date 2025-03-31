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
        if (chat.isGroup) continue; // Ignore group chats

        let messages = await chat.fetchMessages({ limit: 50 });
        let unreadMessages = messages.filter(msg => !msg.isRead);

        if (unreadMessages.length === 0) continue; // Skip if no unread messages

        // Check if "Khair Mubarak" was already sent in this chat
        if (messages.some(msg => msg.fromMe && containsKhair(msg.body))) {
            console.log(`Skipping chat: ${chat.name}, already has 'Khair Mubarak' from me.`);
            continue;
        }

        // If there's an unread Eid greeting, reply
        if (unreadMessages.some(msg => containsEidGreeting(msg.body))) {
            console.log(`Replying to unread Eid message in chat: ${chat.name}`);
            await chat.sendMessage(getEidReply()); // <-- FIXED: Sending message without quoting
        }
    }
});

client.on('message', async (message) => {
    if (message.isGroupMsg) return; // Ignore group messages

    console.log(`Received message: ${message.body}`);

    const chat = await message.getChat();

    // If the message contains Eid greetings, reply no matter what
    if (containsEidGreeting(message.body)) {
        console.log(`Replying to: ${message.body}`);
        await chat.sendMessage(getEidReply()); // <-- FIXED: Sending message without quoting
    }
});

function containsEidGreeting(text) {
    const eidKeywords = ["eid", "eid mubarak", "happy eid", "eid ul fitr", "eid ul adha", "mubarak"];
    return eidKeywords.some(keyword => text.toLowerCase().includes(keyword));
}

function containsKhair(text) {
    return text.toLowerCase().includes("khair mubarak");
}

function getEidReply() {
    return `Khair Mubarak! 🌙✨\nاللهم بارك لنا في عيدنا واجعله مليئًا بالخير والبركات.\nMay this Eid bring you joy and countless blessings!`;
}

client.initialize();
