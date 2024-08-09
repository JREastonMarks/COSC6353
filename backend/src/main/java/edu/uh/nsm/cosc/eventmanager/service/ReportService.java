package edu.uh.nsm.cosc.eventmanager.service;

import java.io.IOException;
import java.io.OutputStream;
import java.io.Writer;
import java.util.List;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;

import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.Border;
import com.itextpdf.layout.borders.SolidBorder;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.UnitValue;
import com.opencsv.CSVWriter;
import com.opencsv.CSVWriterBuilder;

import edu.uh.nsm.cosc.eventmanager.model.Event;
import edu.uh.nsm.cosc.eventmanager.model.Match;
import edu.uh.nsm.cosc.eventmanager.model.User;
import edu.uh.nsm.cosc.eventmanager.repository.EventRepository;
import edu.uh.nsm.cosc.eventmanager.repository.MatchRepository;
import edu.uh.nsm.cosc.eventmanager.repository.UserRepository;

@Service
public class ReportService {
	
	EventRepository eventRepository;
	MatchRepository matchRepository;
	UserRepository userRepository;
	
	private ReportService(EventRepository eventRepository, MatchRepository matchRepository, UserRepository userRepository) {
		this.eventRepository = eventRepository;
		this.matchRepository = matchRepository;
		this.userRepository = userRepository;
	}

	
	public void generateVolunteerPDFReportStream(OutputStream stream, long userId) throws IOException {
		try (Document document = new Document(new PdfDocument(new PdfWriter(stream)))) {
			User user = userRepository.findById(userId);
			
			
			document.add(new Paragraph(user.getFirstName() + " " + user.getLastName()));
			
			Table table = new Table(UnitValue.createPercentArray(2)).useAllAvailableWidth();
			
			List<Match> matches = matchRepository.findByVolunteer(user);
			
			addHeader(table, "Event Name#Event Date".split("#"));
			
			for(Match match : matches) {
				
				Event event = match.getEvent();
				String[] values = new String[] { event.getName(), event.getDescription() };
				addRow(table, values);
			}
			
		}
		stream.close();
	}

	public void generateVolunteerCSVReportStream(Writer response, long userId) {
		// TODO Auto-generated method stub
		User user = userRepository.findById(userId);
		List<Match> match = matchRepository.findByVolunteer(user);
	}


	public void generateEventPDFReportStream(OutputStream stream, long eventId) throws IOException {
		try (Document document = new Document(new PdfDocument(new PdfWriter(stream)))) {
			// Event details and volunteer assignments.
			Event event = eventRepository.findById(eventId);
			
            document.add(new Paragraph(event.getName()));
            document.add(new Paragraph(event.getDescription()));
            document.add(new Paragraph(event.getAddress()));
            if(event.getAddress2() != null) {
            	document.add(new Paragraph(event.getAddress2()));
            }
            document.add(new Paragraph(event.getCity() + ", " + event.getState().getCode() + " " + event.getZipcode()));
            
            Table table = new Table(UnitValue.createPercentArray(2)).useAllAvailableWidth();
            
            List<Match> matches = matchRepository.findByEvent(event);
            
            addHeader(table, "First Name#Last Name".split("#"));
            for(Match match : matches) {
            	User user = match.getVolunteer();
            	String[] values = new String[] {user.getFirstName(), user.getLastName()};
            	addRow(table, values);
            }
            
            
            document.add(table);
        }
		stream.close();
	}

	public void generateEventCSVReportStream(Writer response, long eventId) throws IOException {
		
		Event event = eventRepository.findById(eventId);
		
		
		CSVWriter writer = (CSVWriter) new CSVWriterBuilder(response).withSeparator(',').build();
		String[] entries = "first#second#third".split("#");
		writer.writeNext(entries);
		writer.close();
	}
	
	private void addHeader(Table table, String[] headerNames) {
		Border headerBorder = new SolidBorder(2);
		Stream.of(headerNames).forEach(name -> {
			Cell header = new Cell();
			header.setBackgroundColor(ColorConstants.LIGHT_GRAY);
			
			header.setBorder(headerBorder);
			header.add(new Paragraph(name));
			
			table.addCell(header);
		});
	}
	
	private void addRow(Table table, String[] values) {
		Stream.of(values).forEach(value -> {
			Cell cell = new Cell();
			cell.add(new Paragraph(value));
			table.addCell(cell);
			
		});
		
	}
	
}
