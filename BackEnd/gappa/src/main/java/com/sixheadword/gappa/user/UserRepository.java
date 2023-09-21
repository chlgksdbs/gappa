package com.sixheadword.gappa.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface UserRepository extends JpaRepository<User, Long> {
    User findByLoginIdAndLoginPassword(String loginId, String loginPassword);

    @Query(nativeQuery = true, value = "SELECT credit_score FROM user u WHERE u.user_seq = :userSeq")
    int selectUserCreditScore(@Param("userSeq") Long userSeq);
}
