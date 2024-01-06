package com.example.rentz.config;

import com.example.rentz.data.domain.PayPalClient;
import org.springframework.context.annotation.Bean;

@org.springframework.context.annotation.Configuration
public class Configuration {

    @Bean
    public PayPalClient payPalClient() {
        return new PayPalClient();
    }
}
