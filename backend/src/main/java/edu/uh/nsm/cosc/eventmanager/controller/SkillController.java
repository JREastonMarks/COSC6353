package edu.uh.nsm.cosc.eventmanager.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.uh.nsm.cosc.eventmanager.model.Skill;
import edu.uh.nsm.cosc.eventmanager.service.SkillService;

@RestController
@RequestMapping("/api")
public class SkillController {
	private SkillService skillService;
	
	public SkillController(SkillService skillService) {
		this.skillService = skillService;
	}
	
	@GetMapping(path="/skills")
	List<Skill> skills() {
		return skillService.getSkills();
	}
	
	@GetMapping(path="/skill/{skillId}")
	Skill skill(@PathVariable(required=true) long skillId) {
		return skillService.getSkill(skillId);
	}
}