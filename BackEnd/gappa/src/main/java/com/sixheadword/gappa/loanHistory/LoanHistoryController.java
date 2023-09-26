package com.sixheadword.gappa.loanHistory;

import com.sixheadword.gappa.loanHistory.dto.request.SetLoanTransactionRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/loan/history")
@RequiredArgsConstructor
@Slf4j
public class LoanHistoryController {

    private final LoanHistoryService loanHistoryService;

    // API 1. 대출 및 대금 이력 상세조회
    @GetMapping("/{loanSeq}")
    public ResponseEntity<?> getLoanDetail(@PathVariable("loanSeq") Long loanSeq, Authentication authentication) {
        try {
            return ResponseEntity.ok(loanHistoryService.getLoanHistory(loanSeq, authentication));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("대출 이력 상세조회 실패");
        }
    }

    // API 2. 대출 내역 상세조회
    @PostMapping("/detail")
    public ResponseEntity<?> showTransactionDetail(Authentication authentication, @RequestBody SetLoanTransactionRequestDto setLoanTransactionRequestDto){
        try{
            return ResponseEntity.ok(loanHistoryService.getTransactionDetail(authentication, setLoanTransactionRequestDto));
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("대출 내역 상세조회 실패");
        }
    }

}
