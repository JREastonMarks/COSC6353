package edu.uh.nsm.cosc.eventmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.uh.nsm.cosc.eventmanager.model.User;


public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
