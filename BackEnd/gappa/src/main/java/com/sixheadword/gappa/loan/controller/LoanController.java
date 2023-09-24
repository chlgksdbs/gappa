package com.sixheadword.gappa.loan.controller;

import com.sixheadword.gappa.loan.service.LoanService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/loan")
@RequiredArgsConstructor
@Slf4j
public class LoanController {

    private LoanService loanService;

    // API 1. 대출 이력 조회
    @GetMapping
    public ResponseEntity<?> getLoanHistory(Authentication authentication) {
        try {
            return ResponseEntity.ok(loanService.getLoan(authentication));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("대출 이력 조회 실패");
        }
    }

    // API 2. 대출중 이력 조회
    @GetMapping("/on")
    public ResponseEntity<?> getOnLoanHistory(Authentication authentication) {
        try {
            return ResponseEntity.ok(loanService.getOnLoan(authentication));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("대출중 이력 조회 실패");
        }
    }

    // API 3. 대금 이력 조회
    @GetMapping("/opp")
    public ResponseEntity<?> getLoanOppHistory(Authentication authentication) {
        try {
            return ResponseEntity.ok(loanService.getLoanOpp(authentication));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("대금 이력 조회 실패");
        }
    }

    // API 4. 대금중 이력 조회
    @GetMapping("/opp/on")
    public ResponseEntity<?> getOnLoanOppHistory(Authentication authentication) {
        try {
            return ResponseEntity.ok(loanService.getOnLoanOpp(authentication));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("대출중 이력 조회 실패");
        }
    }
}
