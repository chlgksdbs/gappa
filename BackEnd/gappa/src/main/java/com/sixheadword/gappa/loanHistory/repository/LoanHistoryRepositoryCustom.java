package com.sixheadword.gappa.loanHistory.repository;

import com.sixheadword.gappa.loanHistory.entity.LoanHistory;

import java.util.List;

public interface LoanHistoryRepositoryCustom {

    // 대출 거래 내역 상세 조회
    public List<LoanHistory> findAllByLoanSeq(Long loanSeq);

}
