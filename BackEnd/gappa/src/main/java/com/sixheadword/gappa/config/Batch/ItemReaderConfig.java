package com.sixheadword.gappa.config.Batch;

import com.sixheadword.gappa.loan.Loan;
import com.sixheadword.gappa.loan.repository.LoanRepository;
import com.sixheadword.gappa.user.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.ItemReader;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Slf4j
@RequiredArgsConstructor
@Configuration
public class ItemReaderConfig {

    private final LoanRepository loanRepository;

    @Bean
    public ItemReader<Loan> afterPeriodLoanReader() {

        return null;
    }

    @Bean
    public ItemReader<Loan> beforePeriodLoanReader() {

        return null;
    }

    @Bean
    public ItemReader<User> inactiveUserReader() {

        return null;
    }

}
