DELETE FROM event WHERE id<100;
UPDATE event_seq SET next_val=1 Where next_val>0;

INSERT INTO event (id, name, description, address, address2, city, state, zipcode, skills, urgency, date) 
VALUES (1, 'Test Event', 'Event Description', '101 Main St', null, 'Houston', 0, '12345', 'Database Management', 'Low', '2024-07-23');
UPDATE event_seq SET next_val = 2 WHERE next_val>0;