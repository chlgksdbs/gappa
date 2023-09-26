package com.sixheadword.gappa.config.Batch;

import com.sixheadword.gappa.loan.Loan;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Slf4j
@Configuration
public class ItemProcessorConfig {

    @Bean
    public ItemProcessor<Loan, Loan> overdueLoanProcessor() {
        return null;
    }
}
