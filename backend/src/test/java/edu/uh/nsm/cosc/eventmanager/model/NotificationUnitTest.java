package edu.uh.nsm.cosc.eventmanager.model;

import static org.assertj.core.api.Assertions.assertThat;

import java.text.ParseException;
import java.text.SimpleDateFormat;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class NotificationUnitTest {
	
	@Test
	public void testNotificationCreation() throws ParseException {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		
		Notification notification = new Notification();
		notification.setId(1L);
		
		User receiverUser = new User();
		receiverUser.setId(2L);
		notification.setReceiver(receiverUser);
		
		User sendUser = new User();
		sendUser.setId(3L);
		notification.setSender(sendUser);
		
		notification.setTitle("title");
		notification.setMessage("message");
		notification.setDate(df.parse("2024-04-04"));
		
		assertThat(notification.getId()).isEqualTo(1L);
		assertThat(notification.getReceiver().getId()).isEqualTo(2L);
		assertThat(notification.getSender().getId()).isEqualTo(3L);
		assertThat(notification.getTitle()).isEqualTo("title");
		assertThat(notification.getMessage()).isEqualTo("message");
		assertThat(notification.getDate()).isEqualTo(df.parseObject("2024-04-04"));
	}

}
