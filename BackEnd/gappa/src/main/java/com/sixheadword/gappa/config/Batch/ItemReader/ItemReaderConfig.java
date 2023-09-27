package com.sixheadword.gappa.config.Batch.ItemReader;

import com.sixheadword.gappa.loan.Loan;
import com.sixheadword.gappa.loan.repository.LoanRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Configuration
public class ItemReaderConfig {

    private final LoanRepository loanRepository;

    @Bean
    public QueueItemReader<Loan> afterPeriodLoanReader() {

        List<Loan> overdueLoans =
                loanRepository.findByStatusEquals('D');

        return new QueueItemReader<>(overdueLoans);
    }

    @Bean
    public QueueItemReader<Loan> beforePeriodLoanReader() {

        List<Loan> upcomingDeadlineLoans =
                loanRepository.findByStatusEqualsAndRedemptionDateBetween(
                  'O',
                        LocalDateTime.now().minusWeeks(1),
                        LocalDateTime.now()
                );

        return new QueueItemReader<>(upcomingDeadlineLoans);
    }

}
