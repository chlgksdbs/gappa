package com.sixheadword.gappa.loanHistory;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

// LoanHistory: 대출 내역 테이블
@Getter
@Entity
@Table(name = "LOAN_HISTORY")
public class LoanHistory {

    // loanHistorySeq: 대출 내역 일련번호
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "loan_history_seq", unique = true, nullable = false)
    private Long loanHistorySeq;
    
    // type: 타입
    @Column(length = 20, nullable = false)
    private String type;
    
    // amount: 거래금액
    @Column(nullable = false)
    private Long amount;
    
    // oldRedemptionMoney: 거래 전 상환금
    @Column(name = "old_redemption_money", nullable = false)
    private Long oldRedemptionMoney;
    
    // newRedemptionMoney: 거래 후 상환금
    @Column(name = "new_redemtion_money", nullable = false)
    private Long newRedemptionMoney;
    
    // transactionDate: 거래일시
    @Column(nullable = false)
    private LocalDateTime transactionDate;
}
