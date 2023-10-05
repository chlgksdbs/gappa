package com.sixheadword.gappa.accountHistory.repository;

import com.sixheadword.gappa.accountHistory.AccountHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountHistoryRepository extends JpaRepository<AccountHistory, Long>, AccountHistoryRepositoryCustom {

//    public List<AccountHistory> findAllByLoanSeq(Long loanSeq);

}
