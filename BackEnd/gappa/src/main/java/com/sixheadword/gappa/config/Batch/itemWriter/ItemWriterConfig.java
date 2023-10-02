package com.sixheadword.gappa.config.Batch.itemWriter;

import com.sixheadword.gappa.account.repository.AccountRepository;
import com.sixheadword.gappa.config.Batch.dto.AfterPeriodLoanDto;
import com.sixheadword.gappa.loan.Loan;
import com.sixheadword.gappa.loan.repository.LoanRepository;
import com.sixheadword.gappa.loanHistory.repository.LoanHistoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.ItemWriter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Slf4j
@RequiredArgsConstructor
@Configuration
public class ItemWriterConfig {

    private final LoanRepository loanRepository;
    private final LoanHistoryRepository loanHistoryRepository;
    private final AccountRepository accountRepository;

    @Bean
    public ItemWriter<AfterPeriodLoanDto> afterPeriodLoanWriter() {
        // AfterPeriodLoanWriterCustom을 사용하는 ItemWriter 설정
        return new AfterPeriodLoanWriterCustom(loanRepository, loanHistoryRepository, accountRepository);
    }

    @Bean
    public ItemWriter<Loan> beforePeriodLoanWriter() {
        log.info(">>>>> Spring Batch With AfterPeriodLoanWriter was Executed");

        return null;
    }

}
