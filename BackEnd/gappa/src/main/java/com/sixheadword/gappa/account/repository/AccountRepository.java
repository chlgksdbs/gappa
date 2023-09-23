package com.sixheadword.gappa.account.repository;

import com.sixheadword.gappa.account.Account;
import com.sixheadword.gappa.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long>, AccountRepositoryCustom {

    List<Account> findByUser(User user);
}
