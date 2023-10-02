package com.sixheadword.gappa.webAlarm;

import com.sixheadword.gappa.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WebAlarmRepository extends JpaRepository<WebAlarm, Long> {

    @Query(nativeQuery = true, value = "SELECT * FROM web_alarm w WHERE w.to_user = :userSeq")
    List<WebAlarm> findAllByUserSeq(@Param("userSeq") Long userSeq);

    List<WebAlarm> findAllByToUser(User user);
}
