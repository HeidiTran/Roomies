INSERT INTO Houses (name, password) VALUES ('whatever name of house is', 'the password');
INSERT INTO Users (username, email_addr, password, house_id) VALUES ('Jane', 'Jane@gmail.com', 'Janepwd', 1);
INSERT INTO Tasks (name, house_id) VALUES ('do laundry', 1);
INSERT INTO Tasks (name, house_id, user_id) VALUES ('cooking', 1, 2);
INSERT INTO Items (name, house_id, quantity, price) VALUES ('bread', 1, 2, 8.25);
