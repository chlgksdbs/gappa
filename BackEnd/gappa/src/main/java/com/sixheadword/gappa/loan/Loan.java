package com.sixheadword.gappa.loan;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

// Loan: 대출 테이블
@Getter
@Entity
@Table(name = "LOAN")
public class Loan {

    // loanSeq: 대출 일련번호
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "loan_seq", unique = true, nullable = false)
    private Long loanSeq;

    // fromUser: 돈을 보낸 사용자 일련번호
    
    // toUser: 돈을 받는 사용자 일련번호

    // principal: 대출원금
    @Column(nullable = false)
    private Long principal;
    
    // loanReasonCategory: 카테고리
    @Column(name = "loan_reason_category", length = 50, nullable = false)
    private String loanReasonCategory;
    
    // loanOtherReason: 사유
    @Column(name = "loan_other_reason", length = 100)
    private String loanOtherReason;
    
    // redemptionDate: 희망 상환일자
    @Column(name = "redemption_date", nullable = false)
    private LocalDateTime redemptionDate;
    
    // expiredDate: 최종 상환일자
    @Column(name = "expired_date")
    private LocalDateTime expiredDate;
    
    // redemptionMoney: 상환금
    @Column(name = "redemption_money", nullable = false)
    private Long redemptionMoney;
    
    // interest: 이자
    @Column(nullable = false)
    private Long interest;
    
    // status: 상태
    @Column(length = 1, nullable = false)
    private char status;
}
