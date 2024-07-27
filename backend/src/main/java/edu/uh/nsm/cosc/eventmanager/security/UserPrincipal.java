package edu.uh.nsm.cosc.eventmanager.security;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import edu.uh.nsm.cosc.eventmanager.model.User;

public class UserPrincipal implements UserDetails {
	private static final long serialVersionUID = 2534389938762484610L;
	
	private User user;

    public UserPrincipal(User user) {
        this.setUser(user);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.<GrantedAuthority>singletonList(new SimpleGrantedAuthority("User"));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

	@Override
	public String getPassword() {
		return getUser().getPassword();
	}

	@Override
	public String getUsername() {
		return getUser().getUsername();
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
}
