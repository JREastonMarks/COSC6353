package edu.uh.nsm.cosc.eventmanager.service;

import java.util.List;

import org.springframework.stereotype.Service;

import edu.uh.nsm.cosc.eventmanager.model.Skill;
import edu.uh.nsm.cosc.eventmanager.repository.SkillRepository;

@Service
public class SkillService {
	private SkillRepository skillRepository;
	
	public SkillService(SkillRepository skillRepository) {
		this.skillRepository = skillRepository;
	}

	public List<Skill> getSkills() {
		return skillRepository.findAll();
	}

	public Skill getSkill(long skillId) {
		return skillRepository.getReferenceById(skillId);
	}

}
