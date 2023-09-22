package com.sixheadword.gappa.webAlarm;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WebAlarmRepository extends JpaRepository<WebAlarm, Long> {

    @Query(nativeQuery = true, value = "SELECT * FROM web_alarm w WHERE w.user_seq = :userSeq")
    List<WebAlarm> findAllByUserSeq(@Param("userSeq") Long userSeq);
}
