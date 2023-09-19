package com.sixheadword.gappa.webAlarm;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

// WebAlarm: 알림 테이블
@Getter
@Entity
@Table(name = "WEB_ALARM")
public class WebAlarm {

    // webAlarmSeq : 웹/앱 알림 일련번호
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "web_alarm_seq", unique = true, nullable = false)
    private Long webAlarmSeq;

    // regDate: 발신일시
    @Column(name = "reg_date", nullable = false)
    private LocalDateTime regDate;

    // isRead: 수신 확인
    @Column(name = "is_read", nullable = false)
    private boolean isRead;

    // readDate: 수신 확인일시
    @Column(name = "read_date")
    private LocalDateTime readDate;

    // alarmCategory: 알림 카테고리
    @Column(name = "alarm_category", length = 1, nullable = false)
    private char alarmCategory;

    // alarmContent: 알림 내용
    @Column(name = "alarm_content", nullable = false)
    private String alarmContent;
}
