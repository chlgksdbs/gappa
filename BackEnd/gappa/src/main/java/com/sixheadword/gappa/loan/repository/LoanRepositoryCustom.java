package com.sixheadword.gappa.loan.repository;

import com.sixheadword.gappa.loan.Loan;
import com.sixheadword.gappa.loanHistory.entity.LoanHistory;

import java.util.List;

public interface LoanRepositoryCustom {

//    // 대출 이력 조회
//    public List<Loan> getLoanByUserSeq(Long userSeq);

    // 대출중 이력 조회
    public List<Loan> getOnLoanByUserSeq(Long userSeq);

//    // 대금 이력 조회
//    public List<Loan> getLoanOppByUserSeq(Long userSeq);

    // 대금중 이력 조회
    public List<Loan> getOnLoanOppByUserSeq(Long userSeq);

}
