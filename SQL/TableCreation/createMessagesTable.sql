CREATE TABLE Messages(
id bigint NOT NULL, 
ChatId bigint NOT NULL, 
AuthorId  bigint NOT NULL,
CreateDateTime DATETIME NOT NULL,
MessageTxt TEXT NOT NULL,
PRIMARY KEY(id));