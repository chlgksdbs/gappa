package com.sixheadword.gappa.config.Batch.itemWriter;

import com.sixheadword.gappa.account.Account;
import com.sixheadword.gappa.account.repository.AccountRepository;
import com.sixheadword.gappa.config.Batch.dto.AfterPeriodLoanDto;
import com.sixheadword.gappa.loan.Loan;
import com.sixheadword.gappa.loan.repository.LoanRepository;
import com.sixheadword.gappa.loanHistory.entity.LoanHistory;
import com.sixheadword.gappa.loanHistory.repository.LoanHistoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.ItemWriter;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
public class AfterPeriodLoanWriterCustom implements ItemWriter<AfterPeriodLoanDto> {

    private final LoanRepository loanRepository;
    private final LoanHistoryRepository loanHistoryRepository;
    private final AccountRepository accountRepository;

    @Override
    public void write(List<? extends AfterPeriodLoanDto> items) throws Exception {
        log.info(">>>>> Spring Batch With AfterPeriodLoanWriter was Executed");

        items.forEach(afterPeriodLoanDto -> {
            Loan loan = afterPeriodLoanDto.getLoan();
            LoanHistory loanHistory = afterPeriodLoanDto.getLoanHistory();
            Account fromUserAccount = afterPeriodLoanDto.getFromUserAccount();
            Account toUserAccount = afterPeriodLoanDto.getToUserAccount();

            loanRepository.save(loan);
            loanHistoryRepository.save(loanHistory);
            accountRepository.save(fromUserAccount);
            accountRepository.save(toUserAccount);
        });
    }
}
