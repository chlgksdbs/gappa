package com.sixheadword.gappa.loanHistory.repository;

import com.sixheadword.gappa.loanHistory.LoanHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoanHistoryRepository extends JpaRepository<LoanHistory, Long>, LoanHistoryRepositoryCustom {
}
