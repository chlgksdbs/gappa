package com.sixheadword.gappa.loan.repository;

import com.sixheadword.gappa.account.Account;
import com.sixheadword.gappa.loan.Loan;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.persistence.EntityManager;
import java.util.List;

public class LoanRepositoryImpl {

    private EntityManager em;

    // 대출 이력 조회
//    public List<Loan> getLoanByUserSeq(Long userSeq){
//
//        String jpql = "SELECT l FROM Loan l WHERE l.toUser = :userSeq";
//
//        return em.createQuery(jpql, Loan.class)
//                .setParameter("userSeq", userSeq)
//                .getResultList();
//    }

    // 대출중 이력 조회
    public List<Loan> getOnLoanByUserSeq(Long userSeq){

        String jpql = "SELECT l FROM Loan l WHERE l.toUser = :userSeq AND status in ('O', 'D')";

        return em.createQuery(jpql, Loan.class)
                .setParameter("userSeq", userSeq)
                .getResultList();
    }

    // 대금 이력 조회
//    public List<Loan> getLoanOppByUserSeq(Long userSeq){
//
//        String jpql = "SELECT l FROM Loan l WHERE l.fromUser = :userSeq";
//
//        return em.createQuery(jpql, Loan.class)
//                .setParameter("userSeq", userSeq)
//                .getResultList();
//    }

    // 대금중 이력 조회
    public List<Loan> getOnLoanOppByUserSeq(Long userSeq){

        String jpql = "SELECT l FROM Loan l WHERE l.fromUser = :userSeq AND status in ('O', 'D')";

        return em.createQuery(jpql, Loan.class)
                .setParameter("userSeq", userSeq)
                .getResultList();
    }

}
