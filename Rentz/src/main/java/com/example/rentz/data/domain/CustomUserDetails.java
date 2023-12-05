package com.example.rentz.data.domain;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class CustomUserDetails implements UserDetails {

    private final String uid;
    private final String name;
    private final String email;
    private final String picture;

    public CustomUserDetails(String uid, String name, String email, String picture) {
        this.uid = uid;
        this.name = name;
        this.email = email;
        this.picture = picture;
    }

    // Implement UserDetails methods

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // You may customize this based on your application's requirements
        return null;
    }

    @Override
    public String getPassword() {
        // No password is needed for Firebase authentication
        return null;
    }

    @Override
    public String getUsername() {
        return uid;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }

    // Implement other UserDetails methods...

    // Additional getters for custom fields
    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPicture() {
        return picture;
    }

    public String getUid() {
        return uid;
    }
}
