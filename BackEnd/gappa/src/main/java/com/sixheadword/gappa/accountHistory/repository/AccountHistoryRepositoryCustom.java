package com.sixheadword.gappa.accountHistory.repository;

import com.sixheadword.gappa.accountHistory.AccountHistory;
import com.sixheadword.gappa.loanHistory.entity.LoanHistory;

import java.util.List;

public interface AccountHistoryRepositoryCustom {

    public List<AccountHistory> findAllByAccountSeq(Long accountSeq);

}
