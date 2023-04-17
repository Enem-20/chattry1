ALTER TABLE hello_world_db.chats
	ADD CONSTRAINT FOREIGN KEY(Owner1Id)
    REFERENCES clients(id),
    ADD CONSTRAINT FOREIGN KEY(Owner2Id)
    REFERENCES clients(id)