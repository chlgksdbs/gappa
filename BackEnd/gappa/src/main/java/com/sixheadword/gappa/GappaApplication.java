package com.sixheadword.gappa;

import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableBatchProcessing
@EnableScheduling
@SpringBootApplication
@EnableJpaAuditing
public class GappaApplication {

	public static void main(String[] args) {
		SpringApplication.run(GappaApplication.class, args);
	}

}
