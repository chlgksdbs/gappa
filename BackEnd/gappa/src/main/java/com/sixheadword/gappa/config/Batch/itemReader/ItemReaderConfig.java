package com.sixheadword.gappa.config.Batch.itemReader;

import com.sixheadword.gappa.account.Account;
import com.sixheadword.gappa.account.repository.AccountRepository;
import com.sixheadword.gappa.accountHistory.AccountHistory;
import com.sixheadword.gappa.config.Batch.dto.AfterPeriodLoanDto;
import com.sixheadword.gappa.loan.Loan;
import com.sixheadword.gappa.loan.repository.LoanRepository;
import com.sixheadword.gappa.loanHistory.entity.LoanHistory;
import com.sixheadword.gappa.user.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Configuration
public class ItemReaderConfig {

    private final LoanRepository loanRepository;
    private final AccountRepository accountRepository;

    @Bean
    public QueueItemReader<AfterPeriodLoanDto> afterPeriodLoanReader() {
        log.info(">>>>> Spring Batch With AfterPeriodLoanReader was Executed");

        // Loan 테이블의 status 값이 D(연체중)인 대출 건 읽기
        List<Loan> overdueLoans =
                loanRepository.findByStatusEquals('D');

        List<AfterPeriodLoanDto> afterPeriodLoanDtos = new ArrayList<>();

        overdueLoans.forEach(loan -> {
            // AfterPeriodLoanDto 생성
            LoanHistory loanHistory = new LoanHistory();
            User fromUser = loan.getFromUser();
            User toUser = loan.getToUser();
            Account fromUserRepAccount = accountRepository.findPrimaryByUserSeq(fromUser.getUserSeq());
            Account toUserRepAccount = accountRepository.findPrimaryByUserSeq(toUser.getUserSeq());

            // AfterPeriodLoanDto 추가
            AfterPeriodLoanDto afterPeriodLoanDto = new AfterPeriodLoanDto(loan, loanHistory, fromUser, toUser, fromUserRepAccount, toUserRepAccount, null, null, null, null);
            afterPeriodLoanDtos.add(afterPeriodLoanDto);
        });

        return new QueueItemReader<>(afterPeriodLoanDtos);
    }

}
