package com.sixheadword.gappa.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
@EnableJpaRepositories
public interface UserRepository extends JpaRepository<User, Long> {
    User findByLoginId(String loginId);

    User findByUserSeq(Long userSeq);

    @Query(nativeQuery = true, value = "SELECT credit_score FROM user u WHERE u.user_seq = :userSeq")
    int selectUserCreditScore(@Param("userSeq") Long userSeq);

    @Query(nativeQuery = true, value = "SELECT login_id FROM user u WHERE u.login_id = :loginId")
    String selectUserLoginIdByLoginId(@Param("loginId") String loginId);

    @Query(nativeQuery = true, value = "SELECT login_id FROM user u WHERE u.name = :name AND u.phone = :phone")
    String selectUserLoginIdByNameAndPhone(@Param("name") String name, @Param("phone") String phone);

    // 사용자 상태가 비활성화이며, 탈퇴 후 1년이 지난 유저 리스트
    List<User> findByStateFalseAndExpiredAtBefore(LocalDateTime time);
}
