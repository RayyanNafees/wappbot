const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

// Create a new client instance
const client = new Client({
	puppeteer: {
		args: ["--no-sandbox", "--disable-setuid-sandbox"],
	},
});

// When the client is ready, run this code (only once)
client.once("ready", () => {
	console.log("Client is ready!");
});

// When the client received QR-Code
client.on("qr", (qr) => {
	console.log("QR RECEIVED", qr);
	qrcode.generate(qr, { small: true });
});

client.on("message_create", (message) => {
	console.log(message.type);
	if (message.body === "!ping") {
		// reply back "pong" directly to the message
		message.reply("pong");
	}
});

// Start your client
client.initialize();
