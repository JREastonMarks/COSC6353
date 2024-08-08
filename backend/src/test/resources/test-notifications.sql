DELETE FROM event_skills;
DELETE FROM history;
DELETE FROM eventmatch;
DELETE FROM event;
DELETE FROM notification;
DELETE FROM user_skills;
DELETE FROM skill;
DELETE FROM user;
DELETE FROM states;
UPDATE notification_seq SET next_val=1;

INSERT INTO user (id, first_name, middle_initial, last_name, birthdate, cell_phone, sex, work_phone, registered) VALUES (1, "firstS", "S", "lastS", '2020-01-01', '603-555-5555', 0, '781-555-5555', true);
INSERT INTO user (id, first_name, middle_initial, last_name, birthdate, cell_phone, sex, work_phone, registered) VALUES (2, "firstR", "R", "lastR", '2020-01-01', '603-555-5555', 0, '781-555-5555', true);

INSERT INTO notification (id, date, message, receiver_id, sender_id, title) VALUES (1, '2024-04-10', "This is a test message", 2, 1, "Test Message");

UPDATE notification_seq SET next_val=2;