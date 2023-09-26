package com.sixheadword.gappa.loanHistory.repository;

import com.sixheadword.gappa.loanHistory.entity.LoanHistory;
import lombok.RequiredArgsConstructor;

import javax.persistence.EntityManager;
import java.util.List;

@RequiredArgsConstructor
public class LoanHistoryRepositoryImpl implements LoanHistoryRepositoryCustom{

    private final EntityManager em;

    // 대출 거래 내역 상세 조회
    @Override
    public List<LoanHistory> findAllByLoanSeq(Long loanSeq) {

        String jpql = "SELECT l FROM LoanHistory l WHERE l.loan.loanSeq = :loanSeq";

        return em.createQuery(jpql, LoanHistory.class)
                .setParameter("loanSeq", loanSeq)
                .getResultList();
    }
}
