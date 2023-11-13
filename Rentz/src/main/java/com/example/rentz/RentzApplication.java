package com.example.rentz;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
//@ComponentScan("com.example.rentz.mapper")
//@SpringBootApplication(exclude = {HibernateJpaAutoConfiguration.class})
public class RentzApplication {

	public static void main(String[] args) {
		SpringApplication.run(RentzApplication.class, args);
	}

}
