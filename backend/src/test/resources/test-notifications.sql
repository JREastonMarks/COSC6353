DELETE FROM notification WHERE id<100;
DELETE FROM user WHERE id IN (1,2);
UPDATE notification_seq SET next_val=1 WHERE next_val>0;

INSERT INTO user (id, first_name, middle_initial, last_name, birthdate, cell_phone, sex, work_phone) VALUES (1, "firstS", "S", "lastS", '2020-01-01', '603-555-5555', 0, '781-555-5555');
INSERT INTO user (id, first_name, middle_initial, last_name, birthdate, cell_phone, sex, work_phone) VALUES (2, "firstR", "R", "lastR", '2020-01-01', '603-555-5555', 0, '781-555-5555');

INSERT INTO notification (id, date, message, receiver_id, sender_id, title) VALUES (1, '2024-04-10', "This is a test message", 2, 1, "Test Message");
UPDATE notification_seq SET next_val=2 WHERE next_val>0;