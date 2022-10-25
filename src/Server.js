const dgram = require('dgram');

class Server {
    constructor(port = 5000, address = "0.0.0.0") {
        this.socket = dgram.createSocket("udp4");
        this.port = port;
        this.address = address;
    }

    /**
     *
     * @param callback - a callback function
     */
    onMessage(callback) {
        if (typeof callback === "function") {
            this.socket.on("message", (msg, rinfo) => {
                callback(msg, rinfo);
            })
        } else {
            throw TypeError("callback must be a function")
        }
    }

    sendMessage(msg, port = 5000, address = "0.0.0.0") {
        this.socket.send(msg, port, address);
    }

    async start() {
        this.socket.bind(this.port, this.address, () => {
            console.log("listening on port " + this.port)
        });
    }

    close() {
        this.socket.close();
    }

}

module.exports = Server;


