DELETE FROM match WHERE id<100;
DELETE FROM user WHERE id IN (1);
DELETE FROM event WHERE id IN (1);
UPDATE match_seq SET next_val=1 WHERE next_val>0;

INSERT INTO user (id, first_name, middle_initial, last_name, birthdate, cell_phone, sex, work_phone) VALUES (1, "firstS", "S", "lastS", '2020-01-01', '603-555-5555', 0, '781-555-5555');
INSERT INTO event (id, name, description, address, address2, city, state, zipcode, skills, urgency, date) VALUES (1, 'Test Event', 'Event Description', '101 Main St', null, 'Houston', 0, '12345', 'Database Management', 'Low', '2024-07-23');

INSERT INTO match(id, volunteer, event, match) VALUES(1, 1, 1, true);
UPDATE match_seq SET next_val=2 WHERE next_val>0;