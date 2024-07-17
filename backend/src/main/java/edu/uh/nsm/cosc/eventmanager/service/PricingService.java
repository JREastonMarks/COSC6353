package edu.uh.nsm.cosc.eventmanager.service;

import org.springframework.stereotype.Service;

import edu.uh.nsm.cosc.eventmanager.model.Pricing;
import edu.uh.nsm.cosc.eventmanager.repository.PricingRepository;

@Service
public class PricingService {
	private PricingRepository pricingRepository;

    public PricingService(PricingRepository pricingRepository) {
        this.pricingRepository = pricingRepository;
    }
//    
//    public Pricing getPricing() {
//        return pricingRepository.findPricing();
//    }
}
