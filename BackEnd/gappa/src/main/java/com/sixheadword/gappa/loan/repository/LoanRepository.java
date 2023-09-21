package com.sixheadword.gappa.loan.repository;

import com.sixheadword.gappa.loan.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoanRepository extends JpaRepository<Loan, Long>, LoanRepositoryCustom {
    List<Loan> findByUserUser(Long userSeq);
}
