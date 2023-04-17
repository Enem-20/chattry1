ALTER TABLE hello_world_db.messages
	ADD CONSTRAINT FOREIGN KEY(ChatId)
    REFERENCES chats(id)