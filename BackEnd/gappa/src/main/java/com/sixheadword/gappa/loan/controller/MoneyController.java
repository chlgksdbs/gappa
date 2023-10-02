package com.sixheadword.gappa.loan.controller;

import com.sixheadword.gappa.loan.dto.request.FailLoanRequestDto;
import com.sixheadword.gappa.loan.dto.request.RedemptionRequestDto;
import com.sixheadword.gappa.loan.dto.request.SuccessLoanRequestDto;
import com.sixheadword.gappa.loan.service.MoneyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/loan/money")
public class MoneyController {

    private final MoneyService moneyService;

    // API 1. 대출 실행
    @PostMapping("/lend")
    public ResponseEntity<?> successLoan(@RequestBody SuccessLoanRequestDto successLoanRequestDto){
        try {
            moneyService.successLoan(successLoanRequestDto);
            return ResponseEntity.status(HttpStatus.OK).build();
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("대출 실행을 실패했습니다.");
        }
    }

    // API 2. 대출 취소
    @PostMapping("/fail")
    public ResponseEntity<?> FailLoan(@RequestBody FailLoanRequestDto failLoanRequestDto){
        try {
            moneyService.failLoan(failLoanRequestDto);
            return ResponseEntity.status(HttpStatus.OK).build();
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("대출 취소에 실패했습니다.");
        }
    }

    // API 3. 대출금 상환
    @PostMapping("/redemption")
    public ResponseEntity<?> redemptionMoney(@RequestBody RedemptionRequestDto redemptionRequestDto){
        try {
            moneyService.redemptionMoney(redemptionRequestDto);
            return ResponseEntity.status(HttpStatus.OK).build();
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("대출 취소가 실패했습니다.");
        }
    }

}
