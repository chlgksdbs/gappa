package com.sixheadword.gappa.config.Batch;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Slf4j
@RequiredArgsConstructor
@Configuration
public class JobConfig {

    private final JobBuilderFactory jobBuilderFactory;
    private final Step step1;

    // overdueLoanJob: 기한이 지난 대출 건에 대한 Job
    @Bean
    public Job overdueLoanJob() {
        return jobBuilderFactory.get("job")
                .start(step1)
                .build();
    }
}
