package com.sixheadword.gappa.friendList;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

// FriendList: 친구 목록 테이블
@Getter
@Entity
@Table(name = "FRIEND_LIST")
public class FriendList {

    // friendListSeq: 친구 목록 일련번호
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "friend_list_seq", unique = true, nullable = false)
    private Long friendListSeq;

    // fromUser: 요청을 보낸 사용자 일련번호

    // toUser: 요청을 받는 사용자 일련번호

    // createDate: 생성일시
    @Column(name = "create_date", nullable = false)
    private LocalDateTime createDate;
}
