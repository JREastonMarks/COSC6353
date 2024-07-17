package edu.uh.nsm.cosc.eventmanager.model;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class PricingUnitTest {

    @Test
    public void testHistoryCreation() {
        
        Pricing pricing = new Pricing();
    
        assertThat(pricing).isNotNull();
        
    }
    
}
