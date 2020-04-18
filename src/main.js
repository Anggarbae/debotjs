const Donnigansmand = require('./command');
const { Message, OpType, Location, Profile } = require('../curve-thrift/line_types');

class LINE extends Donnigansmand {
    constructor() {
        super();
        this.receiverID = '';
        this.messages;
        this.payload;
    }


    get myBot() {
        const bot = ['u658faac9bf831d05d7ec2c7769ea3cad'];
        return bot;
    }

    isAdminOrBot(param) {
        return this.myBot.includes(param);
    }

    getOprationType(operations) {
        for (let key in OpType) {
            if(operations.type == OpType[key]) {
                if(key !== 'NOTIFIED_UPDATE_PROFILE') {
                    console.info(`[# ${operations.type} ] ${key} `);
                }
            }
        }
    }

    poll(operation) {
        if(operation.type == 25) {
            let message = new Message(operation.message);
            this.receiverID = message.to = (operation.message.to === this.myBot[0]) ? operation.message._from : operation.message.to ;
            Object.assign(message,{ ct: operation.createdTime.toString() });
            this.textMessage(message)
        }
        this.getOprationType(operation);
    }

    command(msg, reply) {
        if(this.messages.text !== null) {
            if(this.messages.text === msg.trim()) {
                if(typeof reply === 'function') {
                    reply();
                    return;
                }
                if(Array.isArray(reply)) {
                    reply.map((v) => {
                        this._sendMessage(this.messages, v);
                    })
                    return;
                }
                return this._sendMessage(this.messages, reply);
            }
        }
    }

    async textMessage(messages) {
        this.messages = messages;
        let payload = (this.messages.text !== null) ? this.messages.text.split(' ').splice(1).join(' ') : '' ;
        let receiver = messages.to;
        let sender = messages.from;

        this.command('berkas', ['_X_X_X_X_X_X_X_\nJS\n_X_X_X_X_X_X_X_\n?grouplist\n?speed\n?nook\n?happyhalloween\n_X_X_X_X_X_X_X_\n_X_X_X_X_X_X_X_']);
        this.command('sp', this.getSpeed.bind(this));
        this.command('response', 'JS sudah siap pakai');
        this.command('my', this.contact.bind(this));
        this.command('grouplist', this.checkGroup.bind(this));
        this.command('by', this.Nook.bind(this));
        this.command('dahlahmlz', this.Donnicogans.bind(this));
        this.command('dahlah', this.Ngentot.bind(this));

    }

}

module.exports = LINE;
