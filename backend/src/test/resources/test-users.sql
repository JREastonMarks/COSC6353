DELETE FROM event_skills;
DELETE FROM history;
DELETE FROM eventmatch;
DELETE FROM event;
DELETE FROM notification;
DELETE FROM user_skills;
DELETE FROM skill;
DELETE FROM user;
DELETE FROM states;

INSERT INTO skill (id, name) VALUES(1, 'Database Management');
INSERT INTO user (id, username, first_name, middle_initial, last_name, birthdate, cell_phone, sex, work_phone, registered) VALUES (1, "test@test.com", "firstS", "S", "lastS", '2020-01-01', '603-555-5555', 0, '781-555-5555', true);
INSERT INTO user_skills(user_id, skills_id) VALUES(1,1);