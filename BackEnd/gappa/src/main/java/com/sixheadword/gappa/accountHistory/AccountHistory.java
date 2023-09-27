package com.sixheadword.gappa.accountHistory;

import com.sixheadword.gappa.account.Account;
import com.sixheadword.gappa.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

// AccountHistory: 계좌 거래내역 테이블
@Getter
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "ACCOUNT_HISTORY")
public class AccountHistory {

    // accountHistorySeq: 계좌 거래내역 일련번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_history_seq", unique = true, nullable = false)
    private Long accountHistorySeq;

    // account: 계좌 정보
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_seq")
    private Account account;

    // toUser: 거래 상대 사용자 일련번호
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_user")
    private User toUser;

    // oldBalance: 거래 전 잔액
    @Column(name = "old_balance", nullable = false)
    private Long oldBalance;
    
    // newBalance: 거래 후 잔액
    @Column(name = "new_balance", nullable = false)
    private Long newBalance;
    
    // amount: 거래 금액
    @Column(nullable = false)
    private Long amount;
    
    // createdAt: 거래내역 생성일자
    @CreatedDate    // entity 생성 시각 자동 기록
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    // accountType: 거래 분류
    @Column(name = "account_type", nullable = false)
    private boolean accountType;

    @Builder
    public AccountHistory(Account account, User toUser, Long oldBalance, Long newBalance, Long amount, LocalDateTime createdAt, boolean accountType){
        this.account = account;
        this.toUser = toUser;
        this.oldBalance = oldBalance;
        this.newBalance = newBalance;
        this.amount = amount;
        this.createdAt = createdAt;
        this.accountType = accountType;
    }

}
