DELETE FROM event_skills;
DELETE FROM history;
DELETE FROM eventmatch;
DELETE FROM event;
DELETE FROM states;
DELETE FROM notification;
DELETE FROM user_skills;
DELETE FROM skill;
DELETE FROM user;

UPDATE event_seq SET next_val=1 Where next_val>0;

INSERT INTO states(code, state) VALUES('TX', 'Texas');

INSERT INTO event (id, name, description, address, address2, city, state, zipcode, urgency, eventdate) 
VALUES (1, 'Test Event', 'Event Description', '101 Main St', null, 'Houston', 'TX', '12345', 'Low', '2024-07-23');

INSERT INTO skill(id, name) VALUES(1, 'Database Management');

INSERT INTO event_skills(event_id, skills_id) VALUES(1,1);


UPDATE event_seq SET next_val = 2 WHERE next_val>0;