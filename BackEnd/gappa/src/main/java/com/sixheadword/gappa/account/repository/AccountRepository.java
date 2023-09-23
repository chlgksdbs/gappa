package com.sixheadword.gappa.account.repository;

import com.sixheadword.gappa.account.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long>, AccountRepositoryCustom {

    @Query(nativeQuery = true, value = "SELECT a.account_seq, a.account_number, a.bank, a.balance FROM account a JOIN user u USING(user_seq) WHERE user_seq = :userSeq")
    List<Account> findByUser(@Param("userSeq") Long userSeq);
}
