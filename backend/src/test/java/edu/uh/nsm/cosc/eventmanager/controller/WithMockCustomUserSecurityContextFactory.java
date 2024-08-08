package edu.uh.nsm.cosc.eventmanager.controller;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithSecurityContextFactory;
import edu.uh.nsm.cosc.eventmanager.model.User;
import edu.uh.nsm.cosc.eventmanager.security.UserPrincipal;

public class WithMockCustomUserSecurityContextFactory
implements WithSecurityContextFactory<WithMockCustomUser> {
@Override
public SecurityContext createSecurityContext(WithMockCustomUser customUser) {
	SecurityContext context = SecurityContextHolder.createEmptyContext();
	
	User user = new User();
	user.setUsername("testV@test.com");
	UserPrincipal principal =
		new UserPrincipal(user);
	Authentication auth =
		UsernamePasswordAuthenticationToken.authenticated(principal, "password", principal.getAuthorities());
	context.setAuthentication(auth);
	return context;
}
}