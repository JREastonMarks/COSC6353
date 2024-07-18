package edu.uh.nsm.cosc.eventmanager.repository;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class PricingRepositoryIntegrationTest {
    
    @Autowired
    private PricingRepository pricingRepository;

    @Test
    void contextLoads() throws Exception {
		assertThat(pricingRepository).isNotNull();
	}

}