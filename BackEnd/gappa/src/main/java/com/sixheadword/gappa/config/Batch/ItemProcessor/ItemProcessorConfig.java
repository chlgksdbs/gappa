package com.sixheadword.gappa.config.Batch.ItemProcessor;

import com.sixheadword.gappa.loan.Loan;
import com.sixheadword.gappa.user.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Slf4j
@RequiredArgsConstructor
@Configuration
public class ItemProcessorConfig {

    @Bean
    public ItemProcessor<Loan, Loan> afterPeriodLoanProcessor() {
        return null;
    }

    @Bean
    public ItemProcessor<Loan, Loan> beforePeriodLoanProcessor() {
        return null;
    }

    @Bean
    public ItemProcessor<User, User> inactiveUserProcessor() {
        return null;
    }

}
