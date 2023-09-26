package com.sixheadword.gappa.accountHistory.repository;

import com.sixheadword.gappa.account.Account;
import com.sixheadword.gappa.accountHistory.AccountHistory;
import lombok.RequiredArgsConstructor;

import javax.persistence.EntityManager;
import java.util.List;

@RequiredArgsConstructor
public class AccountHistoryRepositoryImpl implements AccountHistoryRepositoryCustom{

    private final EntityManager em;

    // 계좌 거래 내역 조회
    public List<AccountHistory> findAllByAccountSeq(Long accountSeq){

        String jpql = "SELECT a FROM AccountHistory a WHERE a.account.accountSeq = :accountSeq";

        return em.createQuery(jpql, AccountHistory.class)
                .setParameter("accountSeq", accountSeq)
                .getResultList();
    }

}
