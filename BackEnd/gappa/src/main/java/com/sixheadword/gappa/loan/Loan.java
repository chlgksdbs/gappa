package com.sixheadword.gappa.loan;

import com.sixheadword.gappa.loanHistory.entity.LoanHistory;
import com.sixheadword.gappa.user.User;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

// Loan: 대출 테이블
@Getter @Setter
@Entity
@Table(name = "LOAN")
public class Loan {

    // loanSeq: 대출 일련번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "loan_seq", unique = true, nullable = false)
    private Long loanSeq;

    // loanHistories: 대출 내역 정보
    @OneToMany(mappedBy = "loan", cascade = CascadeType.ALL)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<LoanHistory> loanHistories = new ArrayList<>();

    // fromUser: 돈을 보낸 사용자 일련번호
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "from_user")
    private User fromUser;
    
    // toUser: 돈을 받는 사용자 일련번호
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "to_user")
    private User toUser;

    // principal: 대출원금
    @Column(nullable = false)
    private Long principal;
    
    // loanReasonCategory: 카테고리
    @Column(name = "loan_reason_category", length = 50, nullable = false)
    private String loanReasonCategory;
    
    // loanOtherReason: 사유
    @Column(name = "loan_other_reason", length = 100)
    private String loanOtherReason;

    // startDate: 실행일자
    @Column(name = "start_date", nullable = false)
    private LocalDateTime startDate;
    
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

//    @Builder
//    public Loan(User fromUser, User toUser, Long principal, String loanReasonCategory, String loanOtherReason, LocalDateTime startDate, LocalDateTime redemptionDate, Long interest, char status){
//        this.fromUser = fromUser;
//        this.toUser = toUser;
//        this.principal = principal;
//        this.loanReasonCategory = loanReasonCategory;
//        this.loanOtherReason = loanOtherReason;
//        this.startDate = startDate;
//        this.redemptionDate = redemptionDate;
//        this.interest = interest;
//        this.status = status;
//    }

    // 상태 변경 메서드
    public void setStatus(char newStatus){
        this.status = newStatus;
    }


}
