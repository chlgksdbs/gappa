package com.sixheadword.gappa.config.Batch.ItemReader;

import com.sixheadword.gappa.account.Account;
import com.sixheadword.gappa.loan.Loan;
import com.sixheadword.gappa.loan.repository.LoanRepository;
import com.sixheadword.gappa.user.User;
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
        log.info(">>>>> Spring Batch With AfterPeriodLoanReader was Executed");

        // Loan 테이블의 status 값이 D(연체중)인 대출 건 읽기
        List<Loan> overdueLoans =
                loanRepository.findByStatusEquals('D');

        // 해당 대출 건의 from_user의 Account 테이블의 대표 계좌 잔액 확인
        overdueLoans.forEach(loan -> {
            User fromUser = loan.getFromUser();
            Account repAccount =
        });

        // 대표 계좌 잔액이 상환금값보다 큰 경우, to_user에게 이체 수행

        // 실패한 경우 ExitStatus.FAILED로 수정하고 failAfterPeriodLoanStep() 수행

        return new QueueItemReader<>(overdueLoans);
    }

    @Bean
    public QueueItemReader<Loan> beforePeriodLoanReader() {
        log.info(">>>>> Spring Batch With BeforePeriodLoanReader was Executed");

        List<Loan> upcomingDeadlineLoans =
                loanRepository.findByStatusEqualsAndRedemptionDateBetween(
                  'O',
                        LocalDateTime.now().minusWeeks(1),
                        LocalDateTime.now()
                );

        return new QueueItemReader<>(upcomingDeadlineLoans);
    }

}
