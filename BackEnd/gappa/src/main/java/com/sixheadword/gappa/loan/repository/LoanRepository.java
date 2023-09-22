package com.sixheadword.gappa.loan.repository;

import com.sixheadword.gappa.loan.Loan;
import com.sixheadword.gappa.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoanRepository extends JpaRepository<Loan, Long>, LoanRepositoryCustom {
    // 대출 이력 조회
    List<Loan> findByFromUser(User user);

    // 대금 이력 조회
    List<Loan> findByToUser(User user);
}
