DELETE FROM event_skills;
DELETE FROM history;
DELETE FROM eventmatch;
DELETE FROM event;
DELETE FROM notification;
DELETE FROM user_skills;
DELETE FROM skill;
DELETE FROM user;
DELETE FROM states;

INSERT INTO skill (id, name) VALUES
(1, 'Database Management'),
(2, 'IT Proficiency'),
(3, 'Website Management'),
(4, 'Project Management'),
(5, 'Time Management'),
(6, 'Budgeting'),
(7, 'Communication'),
(8, 'Teamwork'),
(9, 'Problem-Solving'),
(10, 'Fundraising'),
(11, 'Grant Writing'),
(12, 'Policy and Advocacy'),
(13, 'Leadership'),
(14, 'Adaptability'),
(15, 'Ethical Awareness'),
(16, 'Empathy'),
(17, 'Cultural Competence'),
(18, 'Resilience');
