package com.sixheadword.gappa.accountHistory;

import com.sixheadword.gappa.account.Account;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

// AccountHistory: 계좌 거래내역 테이블
@Getter
@Entity
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
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    // accountType: 거래 분류
    @Column(name = "account_type", nullable = false)
    private boolean accountType;
}
