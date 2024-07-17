package edu.uh.nsm.cosc.eventmanager.controller;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
public class PricingControllerIntegrationTest {
    @Autowired
    private PricingController pricingController;

    @Test
    void contextLoads() throws Exception {
		assertThat(pricingController).isNotNull();
	}
}
