package com.sixheadword.gappa.friendRequest;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

// FriendRequest: 친구 신청 테이블
@Getter
@Entity
@Table(name = "FRIEND_REQUEST")
public class FriendRequest {

    // friendRequestSeq: 친구 신청 일련번호
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "friend_request_seq", unique = true, nullable = false)
    private Long friendRequestSeq;

    // fromUser: 요청을 보낸 사용자 일련번호
    
    // toUser: 요청을 받는 사용자 일련번호

    // requestDate: 생성일시
    @Column(name = "request_date", nullable = false)
    private LocalDateTime requestDate;

    // state: 상태
    @Column(length = 1, nullable = false)
    private char state;
}