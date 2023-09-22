package com.sixheadword.gappa.loan;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/loan")
@RequiredArgsConstructor
@Slf4j
public class LoanController {

    private LoanService loanService;

    // API 1. 대출 이력 조회
    @GetMapping("/{userSeq}")
    public ResponseEntity<?> getLoanHistory(@PathVariable("userSeq") Long userSeq) {
        try {
            return ResponseEntity.ok(loanService.getLoan(userSeq));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("대출 이력 조회 실패");
        }
    }

    // API 2. 대출중 이력 조회
    @GetMapping("/on/{userSeq}")
    public ResponseEntity<?> getOnLoanHistory(@PathVariable("userSeq") Long userSeq) {
        try {
            return ResponseEntity.ok(loanService.getOnLoan(userSeq));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("대출중 이력 조회 실패");
        }
    }

    // API 3. 대금 이력 조회
    @GetMapping("/opp/{userSeq}")
    public ResponseEntity<?> getLoanOppHistory(@PathVariable("userSeq") Long userSeq) {
        try {
            return ResponseEntity.ok(loanService.getLoanOpp(userSeq));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("대금 이력 조회 실패");
        }
    }

    // API 4. 대금중 이력 조회
    @GetMapping("/opp/on/{userSeq}")
    public ResponseEntity<?> getOnLoanOppHistory(@PathVariable("userSeq") Long userSeq) {
        try {
            return ResponseEntity.ok(loanService.getOnLoanOpp(userSeq));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("대출중 이력 조회 실패");
        }
    }
}
