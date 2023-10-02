package com.sixheadword.gappa.loan.repository;

import com.sixheadword.gappa.account.Account;
import com.sixheadword.gappa.loan.Loan;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.persistence.EntityManager;
import java.util.List;

@RequiredArgsConstructor
public class LoanRepositoryImpl {

    private final EntityManager em;

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

        String jpql = "SELECT l FROM Loan l WHERE l.fromUser.userSeq = :userSeq AND status in ('O', 'D')";

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

        String jpql = "SELECT l FROM Loan l WHERE l.toUser.userSeq = :userSeq AND status in ('O', 'D')";

        return em.createQuery(jpql, Loan.class)
                .setParameter("userSeq", userSeq)
                .getResultList();
    }

    // 모든 대출 신청 내역 조회
    public List<Loan> getAllLoanRequest(Long userSeq){
        String jpql = "SELECT l FROM Loan l WHERE l.toUser.userSeq = :userSeq AND status = 'W'";

        return em.createQuery(jpql, Loan.class)
                .setParameter("userSeq", userSeq)
                .getResultList();
    }

}
