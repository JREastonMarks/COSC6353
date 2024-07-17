package edu.uh.nsm.cosc.eventmanager.service;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
public class PricingServiceIntegrationTest {
    @Autowired
	private PricingService pricingService;
	
	@Test
	void contextLoads() throws Exception {
		assertThat(pricingService).isNotNull();
	}
	
}
