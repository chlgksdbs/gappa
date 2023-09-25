package com.sixheadword.gappa.loan.service;

import com.sixheadword.gappa.account.Account;
import com.sixheadword.gappa.account.repository.AccountRepository;
import com.sixheadword.gappa.loan.Loan;
import com.sixheadword.gappa.loan.dto.request.FailLoanRequestDto;
//import com.sixheadword.gappa.loan.dto.request.RedemptionRequestDto;
import com.sixheadword.gappa.loan.dto.request.RedemptionRequestDto;
import com.sixheadword.gappa.loan.dto.request.SuccessLoanRequestDto;
import com.sixheadword.gappa.loan.repository.LoanRepository;
import com.sixheadword.gappa.loanHistory.entity.LoanHistory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;

@Service
@Transactional
@RequiredArgsConstructor
public class MoneyService {

    private final LoanRepository loanRepository;
    private final AccountRepository accountRepository;

    // 대출 실행
    public void successLoan (SuccessLoanRequestDto successLoanRequestDto){
        Loan loan = loanRepository.findById(successLoanRequestDto.getLoanSeq()).orElse(null);
        if(loan != null){
            // 대출 상태 및 실행일자 변경
            loan.setStatus('O');
            loan.setStartDate(LocalDateTime.now());
            // 대출금 이체 실행
            transfer(loan, 1);
            loanRepository.save(loan);
        }else{
            throw new IllegalArgumentException("대출 실행에 실패했습니다.");
        }
    }

    // 대출 취소
    public void failLoan(FailLoanRequestDto failLoanRequestDto){
        // 대출 상태 변경
        Loan loan = loanRepository.findById(failLoanRequestDto.getLoanSeq()).orElse(null);
        if(loan != null){
            loan.setStatus('F');
            loanRepository.save(loan);
        }else{
            throw new IllegalArgumentException("대출 실행 취소에 실패했습니다.");
        }
    }

    // 대출금 상환
    public void redemptionMoney(RedemptionRequestDto redemptionRequestDto){
        // 현 대출 건
        Loan loan = loanRepository.findById(redemptionRequestDto.getLoanSeq()).orElse(null);
        if(loan != null){
            // 대출 내역 저장



//            // 일자 비교
//            int isOver = LocalDateTime.now().compareTo(loan.getExpiredDate());
//            // 상환 일자를 지났으면 이자부터 차감
//            if(isOver > 0){
//
//            }
//            // 상환 일자를 안지났으면
//            else if(isOver <= 0){
//
//            }
        }else{
            throw new IllegalArgumentException("대출 건 조회에 실패했습니다.");
        }

    }

    // 송급 및 입금 실행
    @Transactional
    public void transfer(Loan loan, int type){
        // 채무자
        Account fromUserAccount = accountRepository.findPrimaryByUserSeq(loan.getFromUser().getUserSeq());
        // 채권자
        Account toUserAccount = accountRepository.findPrimaryByUserSeq(loan.getToUser().getUserSeq());

        // type = 0) 상환에 의한 송금 및 입금
        if(type == 0){
            if(fromUserAccount.getBalance() >= loan.getRedemptionMoney()){
                // 채무자가 송금
                fromUserAccount.setMinusBalance(loan.getRedemptionMoney());
                // 채권자는 입금
                toUserAccount.setAddBalance(loan.getRedemptionMoney());
            }else {
                throw new IllegalArgumentException("현재 계좌에 잔액이 부족합니다.");
            }
        }
        // type = 1) 대출 실행에 의한 송금 및 입금
        if(type == 1){
            // 잔액 있는지 확인
            if(toUserAccount.getBalance() >= loan.getRedemptionMoney()){
                // 채권자가 송금
                toUserAccount.setMinusBalance(loan.getRedemptionMoney());
                // 채무자는 입금
                fromUserAccount.setAddBalance(loan.getRedemptionMoney());
            }else {
                throw new IllegalArgumentException("현재 계좌에 잔액이 부족합니다.");
            }
        }

    }

}
