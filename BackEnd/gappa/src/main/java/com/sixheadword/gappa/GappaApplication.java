package com.sixheadword.gappa;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
//@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class GappaApplication {

	public static void main(String[] args) {
		SpringApplication.run(GappaApplication.class, args);
	}

}
