package edu.uh.nsm.cosc.eventmanager.controller;

import static org.hamcrest.CoreMatchers.containsString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import java.util.ArrayList;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import edu.uh.nsm.cosc.eventmanager.model.Skill;
import edu.uh.nsm.cosc.eventmanager.service.SkillService;

@WebMvcTest(controllers=SkillController.class, excludeAutoConfiguration = SecurityAutoConfiguration.class)
public class SkillControllerIntegrationTest {
	
	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private SkillService skillService;
	
	@Test
	void statesShouldReturnListOfStates() throws Exception {
		List<Skill> skills = new ArrayList<>();
		Skill skill = new Skill();
		skill.setName("Database Management");
		skills.add(skill);
		
		when(skillService.getSkills()).thenReturn(skills);
		
		this.mockMvc.perform(get("/api/skills")).andDo(print()).andExpect(status().isOk()).andExpect(content().string(containsString("Database Management")));
	}
	
	@Test
	void stateShouldReturnState() throws Exception {
		Skill skill = new Skill();
		skill.setName("Database Management");
		
		when(skillService.getSkill(1L)).thenReturn(skill);
		
		this.mockMvc.perform(get("/api/skill/1")).andDo(print()).andExpect(status().isOk()).andExpect(content().string(containsString(("Database Management"))));
	}
}
