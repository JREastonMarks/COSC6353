package edu.uh.nsm.cosc.eventmanager.service;

import static org.assertj.core.api.Assertions.assertThat;


import java.io.BufferedOutputStream;
import java.io.BufferedWriter;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;

@SpringBootTest
@Sql("/test-report.sql")
public class ReportServiceIntegrationTest {
	
	@Autowired
	private ReportService reportService;
	
	
	@Test
	void contextLoads() throws Exception {
		assertThat(reportService).isNotNull();
	}
	
	@Test
	void testGenerateVolunteerPDFReportStream() throws IOException {
		BufferedOutputStream out = new BufferedOutputStream(new FileOutputStream("report.pdf"));
		reportService.generateVolunteerPDFReportStream(out, 1);
	}
	
	@Test
	void testGenerateEventPDFReportStream() throws IOException {
		BufferedOutputStream out = new BufferedOutputStream(new FileOutputStream("report.pdf"));
		reportService.generateEventPDFReportStream(out, 1);
	}
	
	@Test
	void testGenerateVolunteerCSVReportStream() throws IOException {
		 Writer out = new BufferedWriter(new OutputStreamWriter(System.out));
		reportService.generateVolunteerCSVReportStream(out, 1);
	}
	
	@Test
	void testGenerateEventCSVReportStream() throws IOException {
		Writer out = new BufferedWriter(new OutputStreamWriter(System.out));
		reportService.generateEventCSVReportStream(out, 1);
	}

}
