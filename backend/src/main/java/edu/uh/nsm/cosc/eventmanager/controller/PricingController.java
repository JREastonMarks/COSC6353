package edu.uh.nsm.cosc.eventmanager.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.uh.nsm.cosc.eventmanager.model.Pricing;
import edu.uh.nsm.cosc.eventmanager.service.PricingService;


@RestController
public class PricingController {
   private PricingService pricingService;

    public PricingController(PricingService pricingService) {
        this.pricingService = pricingService;
    }
    
//    @GetMapping(path="/pricing")
//    Pricing viewPricing() {
//        return pricingService.getPricing();
//    } 
}
