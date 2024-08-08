package edu.uh.nsm.cosc.eventmanager.controller;

import java.io.InputStream;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.uh.nsm.cosc.eventmanager.service.ReportService;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api")
public class ReportController {
	
	ReportService reportService;
	
	public ReportController(ReportService reportService) {
		this.reportService = reportService;
	}
	
	@GetMapping(path="/eventReport")
	public void getEventReport(@RequestParam("format") String format, @RequestParam("eventId") long eventId, HttpServletResponse response) throws Exception {
		if(format.equals("PDF")) {
			response.setContentType(MediaType.APPLICATION_PDF_VALUE);
			response.setHeader("Content-disposition", "attachment; filename=report.pdf");
			reportService.generateEventPDFReportStream(response.getOutputStream(), eventId);
		} else if (format.equals("CSV")) {
			response.setContentType(MediaType.APPLICATION_OCTET_STREAM_VALUE);
			response.setHeader("Content-disposition", "attachment; filename=report.csv");
			reportService.generateEventCSVReportStream(response.getWriter(), eventId);			
		} else {
			throw new Exception("Unknown format");
		}
		
	}
	
	@GetMapping(path="/volunteerReport")
	public ResponseEntity<InputStreamResource> getVolunteerReport(@RequestParam("format") String format,  @RequestParam("userId") long userId, HttpServletResponse response) throws Exception {
		MediaType contentType = MediaType.ALL;
		InputStream in = null;
	
		if(format.equals("PDF")) {
			response.setContentType(MediaType.APPLICATION_PDF_VALUE);
			response.setHeader("Content-disposition", "attachment; filename=report.pdf");
			reportService.generateVolunteerPDFReportStream(response.getOutputStream(), userId);
		} else if (format.equals("CSV")) {
			response.setContentType(MediaType.APPLICATION_OCTET_STREAM_VALUE);
			response.setHeader("Content-disposition", "attachment; filename=report.csv");
			reportService.generateVolunteerCSVReportStream(response.getWriter(), userId);
		} else {
			throw new Exception("Unknown format");
		}
		
		return ResponseEntity.ok()
			      .contentType(contentType)
			      .body(new InputStreamResource(in));
	}
}
