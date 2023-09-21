package com.sixheadword.gappa.account.repository;

import com.sixheadword.gappa.account.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long>, AccountRepositoryCustom {
    List<Account> findByUser(Long userSeq);
}
