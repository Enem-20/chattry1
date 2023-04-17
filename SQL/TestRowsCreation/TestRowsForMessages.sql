INSERT INTO messages (id, ChatId, AuthorId, CreateDateTime, MessageTxt)
VALUES 	(1, 1, 1, '2004-05-23 14:25:10', "text from user 1 to user 2"), 
		(2, 2, 1, '2004-06-05 10:15:45', "text from user 1 to user 3"),
		(3, 2, 3, '2004-06-06 09:36:11', "text from user 3 to user 1"),
		(4, 1, 2, '2004-06-06 21:10:55', "text from user 2 to user 1"),
		(5, 3, 2, '2004-06-06 21:10:35', "text from user 2 to user 3");