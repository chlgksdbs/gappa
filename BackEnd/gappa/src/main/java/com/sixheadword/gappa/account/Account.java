package com.sixheadword.gappa.account;

import com.sixheadword.gappa.accountHistory.AccountHistory;
import com.sixheadword.gappa.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

// Account: 계좌 테이블
@Getter
@Entity
@NoArgsConstructor
@Table(name = "ACCOUNT")
public class Account {

    // accountSeq: 계좌 일련번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_seq", unique = true, nullable = false)
    private Long accountSeq;

    // accountHistories: 계좌 거래내역 정보
    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
    private List<AccountHistory> accountHistories = new ArrayList<>();

    // user: 계좌 사용자 정보
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq", nullable = false)
    private User user;

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
    @Column(name = "rep_account", nullable = false)
    private boolean repAccount;

    // 대표 계좌 변경
    public void modifyPrimary(boolean newRepAccount){
        this.repAccount = newRepAccount;
    }

    public Account(String accountNumber, String bank, Long balance, User user) {
        this.accountNumber = accountNumber;
        this.bank = bank;
        this.balance = balance;
        this.user = user;
    }

    // 송금
    public void setMinusBalance(Long newBalance){
        this.balance = this.balance - newBalance;
    }

    // 입금
    public void setAddBalance(Long newBalance) {
        this.balance = this.balance + newBalance;
    }
}
