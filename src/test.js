const Server = require("./Server");
const prompt = require('prompt-sync')();

const PORT = 5001;



const myServer = new Server(PORT);

myServer.onMessage((msg, rinfo) => {
    if (PORT === 5000) {
        setTimeout(() => {
            myServer.sendMessage(new Date().getMilliseconds().toString(), rinfo.port, rinfo.address);
        }, 1000);
    }
    console.log(`${msg} from ${rinfo.address}:${rinfo.port} at ${new Date().getMilliseconds()}`);
    if (PORT === 5001) {
        myServer.sendMessage(prompt("> "));
    }
})

myServer.start().then(() => {
    if (PORT === 5001) {
        console.log(new Date().getMilliseconds())
        myServer.sendMessage(prompt("> "));
    }
});