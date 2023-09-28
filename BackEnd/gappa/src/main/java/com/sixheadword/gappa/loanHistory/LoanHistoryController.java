package com.sixheadword.gappa.loanHistory;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/loan/history")
@RequiredArgsConstructor
@Slf4j
public class LoanHistoryController {

    private LoanHistoryService loanHistoryService;

    // API 1. 대출 이력 상세조회
    @GetMapping("/{loanSeq}")
    public ResponseEntity<?> getLoanDetail(@PathVariable("loanSeq") Long loanSeq, Authentication authentication) {
        try {
            return ResponseEntity.ok(loanHistoryService.getLoanHistory(0, loanSeq, authentication));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("대출 이력 상세조회 실패");
        }
    }

    // API 2. 대금 이력 상세조회
    @GetMapping("/opp/{loanSeq}")
    public ResponseEntity<?> getLoanOppDetail(@PathVariable("loanSeq") Long loanSeq, Authentication authentication) {
        try {
            return ResponseEntity.ok(loanHistoryService.getLoanHistory(1, loanSeq, authentication));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("대금 이력 상세조회 실패");
        }
    }

}
