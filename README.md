# Khair Mubarak WhatsApp Bot

A simple WhatsApp bot that automatically replies with "Khair Mubarak" to Eid greetings using `whatsapp-web.js`.

## Features
- Listens for Eid-related greetings.
- Sends "Khair Mubarak" as a reply.
- Ensures only one "Khair Mubarak" message is sent per day per chat.
- Uses `whatsapp-web.js` with `LocalAuth` for authentication.

## Installation

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- WhatsApp account (linked via QR code)

# Usage

Once the bot is running:

- It will listen for new messages.
- If a message contains an Eid greeting, it will reply with **"Khair Mubarak"**.
- If the same chat has already received a **"Khair Mubarak"** message that day, it won't send another.

# Contributing

Feel free to fork this repository and submit pull requests.

# License

This project is licensed under the **MIT License**.
