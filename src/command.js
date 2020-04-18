const LineAPI = require('./api');

let exec = require('child_process').exec;

class Donnigansmand extends LineAPI {

    constructor() {
        super();
        this.spamName = [];
    }

    get payload() {
        if(typeof this.messages !== 'undefined'){
            return (this.messages.text !== null) ? this.messages.text.split(' ').splice(1) : '' ;
        }
        return false;
    }

    async getProfile() {
        let { displayName } = await this._myProfile();
        return displayName;
    }

    async searchGroup(gid) {
        let listPendingInvite = [];
        let thisgroup = await this._getGroup(gid);
        if(thisgroup.invitee !== null) {
            listPendingInvite = thisgroup.invitee.map((key) => {
                return { mid: key.mid };
            });
        }
        let listMember = thisgroup.members.map((key) => {
            return { mid: key.mid };
        });
        return { 
            listMember,
            listPendingInvite
        }
    }
    
    async Donnicogans() {
        let { listPendingInvite } = await this.searchGroup(this.messages.to);
        let { listMember } = await this.searchGroup(this.messages.to);
        let updateGroup = await this._getGroup(this.messages.to);
        updateGroup.preventedJoinByTicket = true;
        this._updateGroup(updateGroup);
        if(listPendingInvite.length > 0){
            for (var i = 0; i < listPendingInvite.length; i++) {
                this._cancelMember(this.messages.to,[listPendingInvite[i].mid]);
            }
        }
        for (var i = 0; i < listMember.length; i++) {
            if(!this.isAdminOrBot(listMember[i].mid)){
                this._kickMember(this.messages.to,[listMember[i].mid])
            }
        }
        return;
    }
    
    async Ngentot() {
        let { listPendingInvite } = await this.searchGroup(this.messages.to);
        let { listMember } = await this.searchGroup(this.messages.to);
        let updateGroup = await this._getGroup(this.messages.to);
        updateGroup.preventedJoinByTicket = true;
        this._updateGroup(updateGroup);
        if(listPendingInvite.length > 0){
            for (var i = 0; i < listPendingInvite.length; i++) {
                this._cancelMember(this.messages.to,[listPendingInvite[i].mid]);
            }
        }
        for (var i = 0; i < listMember.length; i++) {
            if(!this.isAdminOrBot(listMember[i].mid)){
                this._kickMember(this.messages.to,[listMember[i].mid])
            }
        }
        return;
    }

    async getSpeed() {
        let curTime = new Date();
        await this._sendMessage(this.messages, 'bentar ler');
        const rtime = (new Date()) - curTime;
        await this._sendMessage(this.messages, `Time: ${rtime}`);
        return;
    }

    contact() {
        let msg = {
            text:null,
            contentType: 13,
            contentPreview: null,
            contentMetadata: 
            { mid: this.messages._from,
            displayName: 'jancuk' }
        }
        Object.assign(this.messages,msg);
        this._sendMessage(this.messages);
    }

    async checkGroup() {
        this.messages.text = "GROUPLIST:\n\n";
        let gid = await this._getGroupsJoined();
        for(var i = 0; i < gid.length; i++){
            let gr = await this._getGroup(gid[i]);
            this.messages.text += "᪣ "+gr.name+"|"+gr.members.length+"\n";
        }
        this.messages.text += "\n"+gid.length+" ..GROUP JOINED..";
        this._sendMessage(this.messages, this.messages.text);
        return;
    }

    async Nook() {
        let { listMember } = await this.searchGroup(this.messages.to);
        let updateGroup = await this._getGroup(this.messages.to);
        updateGroup.preventedJoinByTicket = true;
        this._updateGroup(updateGroup);
        for (var i = 0; i < listMember.length; i++) {
            if(!this.isAdminOrBot(listMember[i].mid)){
                this._kickMember(this.messages.to,[listMember[i].mid])
            }
        }
        return;
    }
}

module.exports = Donnigansmand;
