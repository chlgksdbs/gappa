package com.sixheadword.gappa.messageAlarm;

import com.sixheadword.gappa.user.User;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

// MessageAlarm: 문자 로그 테이블
@Getter
@Entity
@Table(name = "MESSAGE_ALARM")
public class MessageAlarm {

    // messageAlarmSeq: 문자 알림 일련번호
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "message_alarm_seq", unique = true, nullable = false)
    private Long messageAlarmSeq;

    // user: 사용자 정보
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    private User user;
    
    // regDate: 전송일시
    @Column(name = "reg_date", nullable = false)
    private LocalDateTime regDate;
    
    // content: 발송 메시지 내용
    @Column(length = 100, nullable = false)
    private String content;
    
    // phoneNumber: 수신자 휴대폰번호
    @Column(name = "phone_number", length = 11, nullable = false)
    private String phoneNumber;
}
