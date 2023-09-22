package com.sixheadword.gappa.user;

import com.sixheadword.gappa.account.Account;
import com.sixheadword.gappa.friendList.FriendList;
import com.sixheadword.gappa.friendRequest.FriendRequest;
import com.sixheadword.gappa.loan.Loan;
import com.sixheadword.gappa.messageAlarm.MessageAlarm;
import com.sixheadword.gappa.termsHistory.domain.TermsHistory;
import com.sixheadword.gappa.webAlarm.WebAlarm;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

// User: 사용자 테이블
@Getter @Setter
@Entity
@NoArgsConstructor
@Table(name = "USER")
public class User {

    // userSeq: 사용자 일련번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_seq", unique = true, nullable = false)
    private Long userSeq;

    // accounts: 사용자 계좌 정보
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Account> accounts = new ArrayList<>();
    
    // fromLoans: 사용자 대출 정보 (채무자)
    @OneToMany(mappedBy = "fromUser", cascade = CascadeType.ALL)
    private List<Loan> fromLoans = new ArrayList<>();

    // toLoans: 사용자 대출 정보 (채권자)
    @OneToMany(mappedBy = "toUser", cascade = CascadeType.ALL)
    private List<Loan> toLoans = new ArrayList<>();

    // fromFriendLists: 친구 요청을 보낸 사용자 정보 
    @OneToMany(mappedBy = "fromUser", cascade = CascadeType.ALL)
    private List<FriendList> fromFriendLists = new ArrayList<>();

    // toFriendLists: 친구 요청을 받은 사용자 정보
    @OneToMany(mappedBy = "toUser", cascade = CascadeType.ALL)
    private List<FriendList> toFriendLists = new ArrayList<>();

    @OneToMany(mappedBy = "fromUser", cascade = CascadeType.ALL)
    private List<FriendRequest> fromFriendRequests = new ArrayList<>();

    @OneToMany(mappedBy = "toUser", cascade = CascadeType.ALL)
    private List<FriendRequest> toFriendRequests = new ArrayList<>();

    // messageAlarms: 사용자 문자 로그 정보
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<MessageAlarm> messageAlarms = new ArrayList<>();

    // webAlarms: 사용자 웹알림 정보
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<WebAlarm> webAlarms = new ArrayList<>();

    // termsHistories: 약관 동의이력
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<TermsHistory> termsHistories = new ArrayList<>();

    // loginId: 아이디
    @Column(name = "login_id", length = 45, nullable = false, unique = true)
    private String loginId;

    // loginPassword: 비밀번호
    @Column(name = "login_password", nullable = false)
    private String loginPassword;

    // phone: 휴대폰 번호
    @Column(length = 11, nullable = false, unique = true)
    private String phone;

    // name: 이름
    @Column(length = 45, nullable = false)
    private String name;

    // address: 주소
    @Column(length = 100, nullable = false)
    private String address;
    
    // pinPassword: 간편 비밀번호
    @Column(name = "pin_password")
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

    public User(String loginId, String loginPassword, String phone, String name, String address) {
        this.loginId = loginId;
        this.loginPassword = loginPassword;
        this.phone = phone;
        this.name = name;
        this.address = address;
        this.state = true;
        this.creditScore = 0;
    }
}
