package edu.uh.nsm.cosc.eventmanager.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import edu.uh.nsm.cosc.eventmanager.model.Notification;

@SpringBootTest
public class NotificationRepositoryIntegrationTest {
	
	@Autowired
	private NotificationRepository notificationRepository;
	
	@Test
	void contextLoads() throws Exception {
		assertThat(notificationRepository).isNotNull();
	}
	
	@Test
	void testNotifications() {
		List<Notification> notifications = notificationRepository.findAll();
		
		assertThat(notifications.size()).isEqualTo(1);
	}
	
	@Test
	void testNotification() {
		Notification notifications = notificationRepository.findNotificationById(1L);
		
		assertThat(notifications.getId()).isEqualTo(1L);
	}
}
