package com.example.rentz.config.firebase;

import com.example.rentz.data.domain.CustomUserDetails;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class FirebaseFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String HEADER_NAME = "Authorization";
        String authHeader = request.getHeader(HEADER_NAME);

        if (StringUtils.hasText(authHeader) && authHeader.startsWith("Bearer ")) {
            String idToken = authHeader.substring(7);

            try {
                FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);

                String uid = decodedToken.getUid();
                String name = decodedToken.getName();  // Replace with the actual method to get the name
                String email = decodedToken.getEmail();  // Replace with the actual method to get the email
                String picture = decodedToken.getPicture();  // Replace with the actual method to get the picture

                CustomUserDetails userDetails = new CustomUserDetails(uid, name, email, picture);
                Authentication auth = new UsernamePasswordAuthenticationToken(userDetails, null, null);
                SecurityContextHolder.getContext().setAuthentication(auth);

                filterChain.doFilter(request, response);
            } catch (FirebaseAuthException e) {
                throw new SecurityException(e);
            }
        } else {
            throw new SecurityException();
        }
    }

}
