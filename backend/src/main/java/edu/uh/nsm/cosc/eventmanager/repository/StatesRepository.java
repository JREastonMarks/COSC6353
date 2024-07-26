package edu.uh.nsm.cosc.eventmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.uh.nsm.cosc.eventmanager.model.States;

public interface StatesRepository extends JpaRepository<States, String> {
	States findByCode(String code);
}