package edu.uh.nsm.cosc.eventmanager.service;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.Instant;
import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;

import edu.uh.nsm.cosc.eventmanager.model.Notification;
import edu.uh.nsm.cosc.eventmanager.model.User;
import edu.uh.nsm.cosc.eventmanager.repository.UserRepository;

@SpringBootTest
@Sql("/test-notifications.sql")
public class NotificationServiceIntegrationTest {

	@Autowired
	private NotificationService notificationService;
	
	@Autowired
	private UserRepository userRepository;
	
	@Test
	void contextLoads() throws Exception {
		assertThat(notificationService).isNotNull();
	}
	
	@Test
	void testNotifications() {
		List<Notification> notifications = notificationService.getNotifications();
		
		assertThat(notifications.size()).isEqualTo(1);
	}
	
	@Test
	void testNotification() {
		Notification notifications = notificationService.getNotification(1L);
		
		assertThat(notifications.getId()).isEqualTo(1L);
	}
	
	
	@Test
	void createNotification() {
		User receiver = userRepository.getReferenceById(1L);
		User sender = userRepository.getReferenceById(1L);
		
		Notification notification = new Notification();
		notification.setDate(Date.from(Instant.now()));
		notification.setSender(sender);
		notification.setReceiver(receiver);
		notification.setTitle("Test Message");
		notification.setMessage("This is a test message");
		
		notificationService.createNotification(notification);
		
		List<Notification> notifications = notificationService.getNotifications();
		
		assertThat(notifications.size()).isEqualTo(2);
	}
	
	
}