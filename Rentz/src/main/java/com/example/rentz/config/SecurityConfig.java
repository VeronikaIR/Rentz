package com.example.rentz.config;

import com.example.rentz.config.firebase.FirebaseFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

import static org.springframework.web.cors.CorsConfiguration.ALL;


@Configuration
@EnableWebSecurity
public class SecurityConfig {


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);
        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .addFilterAfter(new FirebaseFilter(), UsernamePasswordAuthenticationFilter.class)
                .authorizeRequests((authorize) -> authorize
                        // .requestMatchers(new AntPathRequestMatcher("/api/items")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/items")).permitAll()
                        .anyRequest().authenticated())
                .sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .build();
    }

    @Bean
    public CorsFilter corsFilter() {

        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:4200");
        config.addAllowedHeader(ALL);
        config.addAllowedMethod(ALL);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }

//    @Bean
//    public JwtAuthenticationConverter firebaseJwtAuthenticationConverter() {
//        return new FirebaseJwtAuthenticationConverter();
//    }
}


//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http.authorizeRequests(authorizeRequests -> authorizeRequests
//                        .requestMatchers("/overview").permitAll()
//                        .anyRequest().authenticated()
//                )
//                .sessionManagement(customizer -> customizer.sessionCreationPolicy(STATELESS))
//                .csrf(AbstractHttpConfigurer::disable)
//                .oauth2ResourceServer(resourceServerCustomizer -> resourceServerCustomizer.opaqueToken(Customizer.withDefaults()))
//                .cors(Customizer.withDefaults());
//
//        return http.build();
//    }
