export class Chats{
    push(chat, lastMessage) {
        this.userChats[chat.id] = {ChatInfo: chat, LastMessage: lastMessage};
    }
    pushArrays(chatsRange, lastMessagesRange) {

        chatsRange.sort((a,b) => {
            return (lastMessagesRange.indexOf(a) -  lastMessagesRange.indexOf(b))
        });

        for(let i = 0; i < chatsRange.length; ++i){
            this.userChats[chatsRange[i].id] = {ChatInfo: chatsRange[i], LastMessage: lastMessagesRange[i]};
        }

        console.log(`current userChats: ${JSON.stringify(this.userChats)}`);
    }

    remove(chatId){
        this.userChats.splice(chatId, 1);
    }

    getRaw(){
        return this.userChats;
    }
    userChats = [];
}

export let ClientChats = new Chats();