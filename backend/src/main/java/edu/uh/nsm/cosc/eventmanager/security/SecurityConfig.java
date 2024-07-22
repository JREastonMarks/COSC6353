package edu.uh.nsm.cosc.eventmanager.security;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.authentication.dao.DaoAuthenticationProvider;

import edu.uh.nsm.cosc.eventmanager.service.UserService;

@Configuration
//@EnableWebSecurity
public class SecurityConfig {

	@Autowired
	UserService userDetailService;

	@Autowired
	private DataSource dataSource;

	@Bean
	public SecurityFilterChain noSecurityFilterChain(HttpSecurity http) throws Exception {

		http.authorizeHttpRequests((authorize) -> authorize.anyRequest().permitAll()).csrf((csrf) -> csrf.disable())
				.cors((cors) -> cors.disable());

		return http.build();

	}

//	@Bean
//	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//		http
//			.authorizeHttpRequests((authorize) -> authorize
//				.anyRequest().authenticated()
//			)
//			.httpBasic(Customizer.withDefaults())
//			.formLogin(form -> form
//					.loginPage("/login")
//					.defaultSuccessUrl("/administratorNotifications", true)
//					.loginProcessingUrl("/api/login")
//					.failureUrl("/login?error")
//			).csrf((csrf) -> csrf.disable())
//			.cors((cors) -> cors.disable())
//			.logout(logout -> logout
//					.logoutUrl("/api/logout")
//					.logoutSuccessUrl("/login?loggedout"));
//
//		return http.build();
//	}

//	@Bean
//    public UserDetailsManager users(HttpSecurity http) throws Exception {
//        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
//        authenticationManagerBuilder.userDetailsService(userDetailService).passwordEncoder(passwordEncoder());
//        authenticationManagerBuilder.authenticationProvider(authenticationProvider());
//        AuthenticationManager authenticationManager = authenticationManagerBuilder.build();
//
//        JdbcUserDetailsManager jdbcUserDetailsManager = new JdbcUserDetailsManager(dataSource);
//        jdbcUserDetailsManager.setAuthenticationManager(authenticationManager);
//        return jdbcUserDetailsManager;
//    }
//	
//	@Bean
//    public DaoAuthenticationProvider authenticationProvider() {
//        final DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
//        authProvider.setUserDetailsService(userDetailService);
//        authProvider.setPasswordEncoder(passwordEncoder());
//        return authProvider;
//    }

//	@Bean
//	  public UserDetailsService userDetailsService() {
//		
//		
////	    UserDetails user = User.builder()
////	        .username("user")
////	        .password(passwordEncoder().encode("password"))
////	        .roles("USER")
////	        .build();
////	    UserDetails admin = User.builder()
////	        .username("admin")
////	        .password(passwordEncoder().encode("password"))
////	        .roles("USER", "ADMIN")
////	        .build();
////	    return new InMemoryUserDetailsManager(user, admin);
//	  }

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(11);
	}

}