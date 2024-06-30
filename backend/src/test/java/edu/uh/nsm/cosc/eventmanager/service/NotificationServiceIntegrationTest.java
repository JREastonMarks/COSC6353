package edu.uh.nsm.cosc.eventmanager.service;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import edu.uh.nsm.cosc.eventmanager.model.Notification;

@SpringBootTest
public class NotificationServiceIntegrationTest {

	@Autowired
	private NotificationService notificationService;
	
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
}