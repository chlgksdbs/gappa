package com.sixheadword.gappa.account;

import lombok.Getter;

import javax.persistence.*;

// Account: 계좌 테이블
@Getter
@Entity
@Table(name = "ACCOUNT")
public class Account {

    // accountSeq: 계좌 일련번호
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "account_seq", unique = true, nullable = false)
    private Long accountSeq;

    // accountNumber: 계좌번호
    @Column(name = "account_number", length = 50, nullable = false)
    private String accountNumber;

    // bank: 은행
    @Column(length = 25, nullable = false)
    private String bank;

    // balance: 잔액
    @Column(nullable = false)
    private Long balance;

    // primary: 대표계좌
    @Column(nullable = false)
    private boolean primary;
}
