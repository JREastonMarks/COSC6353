package edu.uh.nsm.cosc.eventmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.uh.nsm.cosc.eventmanager.model.Skill;

public interface SkillRepository extends JpaRepository<Skill, Long> {
	Skill findByName(String name);
}