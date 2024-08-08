package edu.uh.nsm.cosc.eventmanager.service;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;

import edu.uh.nsm.cosc.eventmanager.model.Skill;

@SpringBootTest
@Sql("/test-skills.sql")
public class SkillServiceIntegrationTest {

	@Autowired
	private SkillService skillService;
	
	@Test
	void contextLoads() throws Exception {
		assertThat(skillService).isNotNull();
	}
	
	@Test
	void testSkills() {
		List<Skill> skill = skillService.getSkills();
		
		assertThat(skill.size()).isEqualTo(18);
	}
	
	@Test
	void testSkill() {
//		Skill skill = skillService.getSkill(2L);
//		
//		assertThat(skill.getName()).isEqualTo("Database Management");
	}
	
	
}