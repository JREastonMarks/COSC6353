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

UPDATE history_seq SET next_val=1 WHERE next_val>0;

INSERT INTO states(code, state) VALUES('TX', 'Texas');

INSERT INTO user (id, first_name, middle_initial, last_name, birthdate, cell_phone, sex, work_phone, registered) VALUES (10, "firstS", "S", "lastS", '2020-01-01', '603-555-5555', 0, '781-555-5555', true);
INSERT INTO event (id, name, description, address, address2, city, state, zipcode, urgency, eventdate) VALUES (1, 'Test Event', 'Event Description', '101 Main St', null, 'Houston', 'TX', '12345', 'Low', '2024-07-23');

INSERT INTO skill(id, name) VALUES(1, 'Database Management');

INSERT INTO event_skills(event_id, skills_id) VALUES(1,1);

INSERT INTO history (id, volunteer_id, event_id, status) VALUES(1, 10, 1, 'Active');

UPDATE history_seq SET next_val=2 WHERE next_val>0;