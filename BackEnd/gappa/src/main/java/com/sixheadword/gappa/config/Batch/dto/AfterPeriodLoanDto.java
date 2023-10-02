package com.sixheadword.gappa.config.Batch.dto;

import com.sixheadword.gappa.account.Account;
import com.sixheadword.gappa.loan.Loan;
import com.sixheadword.gappa.loanHistory.entity.LoanHistory;
import lombok.*;

@Data
@Getter @Setter
public class AfterPeriodLoanDto {

    private Loan loan;
    private LoanHistory loanHistory;
    private Account fromUserAccount;
    private Account toUserAccount;

    public AfterPeriodLoanDto(Loan loan, LoanHistory loanHistory, Account fromUserAccount, Account toUserAccount) {
        this.loan = loan;
        this.loanHistory = loanHistory;
        this.fromUserAccount = fromUserAccount;
        this.toUserAccount = toUserAccount;
    }
}
