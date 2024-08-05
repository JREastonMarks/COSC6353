package edu.uh.nsm.cosc.eventmanager.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import edu.uh.nsm.cosc.eventmanager.model.User;
import edu.uh.nsm.cosc.eventmanager.repository.UserRepository;
import edu.uh.nsm.cosc.eventmanager.security.UserPrincipal;


@Service
public class UserService implements UserDetailsService {
	@Autowired
	UserDetailService userDetailService;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    public User getUser(long id) {
    	return userRepository.getReferenceById(id);
    }
    
    public User findUserByUsername(String username) {
    	User user = userRepository.findByUsername(username);
    	return user;
    }

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }
        return new UserPrincipal(user);
	}

	public void registerUser(User user) {
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
		
		user.setPassword(passwordEncoder.encode(user.getPassword()));
			
		userRepository.save(user);
	}

	public boolean doesUserAlreadyExist(String username) {
		User user = userRepository.findByUsername(username);
		return user != null;
	}

	public void updateUser(long userId, User user) {
		user.setId(userId);
		userRepository.save(user);
		
	}
}
