package edu.uh.nsm.cosc.eventmanager.controller;

import static org.hamcrest.CoreMatchers.containsString;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import edu.uh.nsm.cosc.eventmanager.model.Notification;
import edu.uh.nsm.cosc.eventmanager.service.NotificationService;
import edu.uh.nsm.cosc.eventmanager.service.UserService;

@WebMvcTest(controllers = NotificationController.class)
public class NotificationControllerIntegrationTest {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private NotificationService notificationService;

	@MockBean
	private UserService userService;

	@Test
	@WithMockCustomUser
	void notificationShouldReturnListOfMessages() throws Exception {
		List<Notification> notifications = new ArrayList<>();
		Notification notification = new Notification();
		notification.setTitle("Message 1");
		notifications.add(notification);

		when(notificationService.getNotifications(any())).thenReturn(notifications);

		this.mockMvc.perform(get("/api/notifications")).andDo(print()).andExpect(status().isOk())
				.andExpect(content().string(containsString("Message 1")));
	}

	@Test
	@WithMockCustomUser
	void notificationShouldReturnMessages() throws Exception {
		Notification notification = new Notification();
		notification.setId(1L);
		notification.setTitle("Message 1");

		when(notificationService.getNotification(1L)).thenReturn(notification);

		this.mockMvc.perform(get("/api/notification/1")).andDo(print()).andExpect(status().isOk())
				.andExpect(content().string(containsString("Message 1")))
				.andExpect(content().string(containsString("1")));
	}
}
