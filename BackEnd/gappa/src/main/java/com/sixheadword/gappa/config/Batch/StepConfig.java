package com.sixheadword.gappa.config.Batch;

import com.sixheadword.gappa.loan.Loan;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.ItemWriter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Slf4j
@RequiredArgsConstructor
@Configuration
public class StepConfig {

    private final StepBuilderFactory stepBuilderFactory;
    private final ItemReader<Loan> overdueLoanReader;
    private final ItemProcessor<Loan, Loan> overdueLoanProcessor;
    private final ItemWriter<Loan> overdueLoanWriter;

    @Bean
    public Step overdueLoanStep() {
        return stepBuilderFactory.get("overdueLoanStep")
                .<Loan, Loan> chunk(10)
                .reader(overdueLoanReader)
                .processor(overdueLoanProcessor)
                .writer(overdueLoanWriter)
                .build();
    }
}
