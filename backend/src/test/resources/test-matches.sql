DELETE FROM event_skills;
DELETE FROM history;
DELETE FROM eventmatch;
DELETE FROM event;
DELETE FROM notification;
DELETE FROM user_skills;
DELETE FROM skill;
DELETE FROM user_selected_dates;
DELETE FROM user;
DELETE FROM states;
UPDATE eventmatch_seq SET next_val=1;

INSERT INTO states(code, state) VALUES('TX', 'Texas');

INSERT INTO skill(id, name) VALUES(1, 'Database Management');
INSERT INTO skill(id, name) VALUES(2, 'Java Development');

INSERT INTO user (id, first_name, middle_initial, last_name, birthdate, cell_phone, sex, work_phone, registered) VALUES (1, "firstS", "S", "lastS", '2020-01-01', '603-555-5555', 0, '781-555-5555', true);
INSERT INTO event (id, name, description, address, address2, city, state, zipcode, urgency, eventdate) VALUES (1, 'Test Event', 'Event Description', '101 Main St', null, 'Houston', 'TX', '12345', 'Low', '2024-07-23');
INSERT INTO event (id, name, description, address, address2, city, state, zipcode, urgency, eventdate) VALUES (2, 'Test Event 2', 'Event Description 2', '101 Main St', null, 'Houston', 'TX', '12345', 'Medium', '2024-07-23');

INSERT INTO eventmatch(id, volunteer_id, event_id) VALUES(1, 1, 1);

UPDATE eventmatch_seq SET next_val=2;
UPDATE notification_seq SET next_val=2;