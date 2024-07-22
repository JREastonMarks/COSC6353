package edu.uh.nsm.cosc.eventmanager.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import edu.uh.nsm.cosc.eventmanager.model.User;
import edu.uh.nsm.cosc.eventmanager.repository.UserRepository;
import edu.uh.nsm.cosc.eventmanager.security.UserPrincipal;


@Service
public class UserService implements UserDetailsService {
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    public User getUser(long id) {
    	return userRepository.getReferenceById(id);
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
		userRepository.save(user);		
	}
}
