package com.sixheadword.gappa.account.repository;

import com.sixheadword.gappa.account.Account;
import lombok.RequiredArgsConstructor;

import javax.persistence.EntityManager;
import java.util.List;

@RequiredArgsConstructor
public class AccountRepositoryImpl implements AccountRepositoryCustom{

    private final EntityManager em;

    // 대표 계좌 설정
    @Override
    public void setPrimaryAccount(Long userSeq, Long accountSeq) {

        String jpql = "UPDATE account a SET a.repAccount = TRUE WHERE a.userSeq = :userSeq AND a.accountSeq = :accountSeq";

        em.createQuery(jpql)
                .setParameter("userSeq", userSeq)
                .setParameter("accountSeq", accountSeq)
                .executeUpdate();
    }

    // 현재 대표 계좌 해제
    @Override
    public void unsetPrimaryAccount(Long userSeq, Long accountSeq) {

        String jpql = "UPDATE account a SET a.repAccount = FALSE WHERE a.userSeq = :userSeq AND a.accountSeq = :accountSeq";

        em.createQuery(jpql)
                .setParameter("userSeq", userSeq)
                .setParameter("accountSeq", accountSeq)
                .executeUpdate();
    }

    // 대표 계좌 조회
    @Override
    public Account findPrimaryByUserSeq(Long userSeq) {

        String jpql = "SELECT a FROM account a WHERE a.userSeq = :userSeq AND a.repAccount = TRUE";

        return em.createQuery(jpql, Account.class)
                .setParameter("userSeq", userSeq)
                .getSingleResult();
    }

    @Override
    public List<Account> findAllAccounts(Long userSeq) {

        String jpql = "SELECT a FROM account a WHERE a.userSeq = :userSeq";

        return em.createQuery(jpql, Account.class)
                .setParameter("userSeq", userSeq)
                .getResultList();
    }

    // 전체 계좌 조회

}
