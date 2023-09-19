package com.sixheadword.gappa.user;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

// User: 사용자 테이블
@Getter
@Entity
@Table(name = "USER")
public class User {

    // userSeq: 사용자 일련번호
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_seq", unique = true, nullable = false)
    private Long userSeq;

    // loginId: 아이디
    @Column(name = "login_id", length = 45, nullable = false)
    private String loginId;

    // loginPassword: 비밀번호
    @Column(name = "login_password", nullable = false)
    private String loginPassword;

    // phone: 휴대폰 번호
    @Column(length = 11, nullable = false)
    private String phone;

    // name: 이름
    @Column(length = 45, nullable = false)
    private String name;

    // address: 주소
    @Column(length = 100, nullable = false)
    private String address;
    
    // pinPassword: 간편 비밀번호
    @Column(name = "pin_password", nullable = false)
    private String pinPassword;
    
    // state: 사용자 활성 상태
    @Column(nullable = false)
    private boolean state;

    // creditScore: 신용점수
    @Column(name = "credit_score", nullable = false)
    private int creditScore;

    // profileImg: 프로필 사진
    @Column(name = "profile_img", length = 100)
    private String profileImg;

    // refreshToken: JWT refresh_token
    @Column(name = "refresh_token")
    private String refreshToken;

    // expiredAt: 만료일시
    @Column(name = "expired_at")
    private LocalDateTime expiredAt;

}
