const dgram = require("dgram");
const prompt = require("prompt-sync")();

async function sendMessage(message) {
    return new Promise((resolve, reject) => {
        if (message.toLowerCase() === "quit" || message.toLowerCase() === "q") {
            reject();
        }

        const client = dgram.createSocket("udp4");

        client.send(message, 5000, "0.0.0.0", () => {
            client.close()
            resolve();
        });
    })
}

module.exports = function getMessage() {
    const message = prompt("> ");

    sendMessage(message).then(getMessage).catch(() => {
        console.log("Thanks for using this!")
    });
}



