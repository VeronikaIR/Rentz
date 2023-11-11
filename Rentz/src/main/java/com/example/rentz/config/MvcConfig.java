package com.example.rentz.config;

import com.example.rentz.utils.ObjectMapperFactory;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableWebMvc
@Configuration
public class MvcConfig implements WebMvcConfigurer {


    @Bean
    @Primary
    public ObjectMapper objectMapper() {

        return ObjectMapperFactory.getObjectMapper();
    }
}
