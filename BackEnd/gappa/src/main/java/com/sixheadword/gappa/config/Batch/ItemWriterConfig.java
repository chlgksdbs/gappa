package com.sixheadword.gappa.config.Batch;

import com.sixheadword.gappa.loan.Loan;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.ItemWriter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Slf4j
@RequiredArgsConstructor
@Configuration
public class ItemWriterConfig {

    @Bean
    public ItemWriter<Loan> overdueLoanWriter() {
        return null;
    }
}
