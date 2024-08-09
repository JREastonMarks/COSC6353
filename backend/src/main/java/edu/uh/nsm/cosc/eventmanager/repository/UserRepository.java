package edu.uh.nsm.cosc.eventmanager.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.uh.nsm.cosc.eventmanager.model.Skill;
import edu.uh.nsm.cosc.eventmanager.model.User;


public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findById(long userId);
    
//    @Query("SELECT u FROM User u JOIN u.selectedDates sd WHERE u.skills IN (:skillsNeeded) AND sd = :eventDate")
//	List<User> findUserMatch(Date eventDate, List<Skill> skillsNeeded);
    
    List<User> findBySelectedDatesAndSkillsIn(Date eventDate, List<Skill> skillsNeeded);

}
