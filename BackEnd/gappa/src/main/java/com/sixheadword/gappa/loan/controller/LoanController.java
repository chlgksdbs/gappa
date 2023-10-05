package com.sixheadword.gappa.loan.controller;

import com.sixheadword.gappa.loan.dto.request.LoanInfoRequestDto;
import com.sixheadword.gappa.loan.service.LoanService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/loan")
@RequiredArgsConstructor
@Slf4j
public class LoanController {

    private final LoanService loanService;

    // API 1. 대출 정보 등록
    @PostMapping("/regist")
    public ResponseEntity<?> registLoanInfo(@RequestBody LoanInfoRequestDto loanInfoRequestDto){
        try{
            loanService.registLoanInfo(loanInfoRequestDto);
            return ResponseEntity.status(HttpStatus.OK).build();
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("대출 정보 등록 실패");
        }
    }

    // API 2. 대출 신청 해당건 조회
    @GetMapping("/apply/{loanSeq}")
    public ResponseEntity<?> getLoanRequest(@PathVariable Long loanSeq, Authentication authentication){
        try{
            return ResponseEntity.ok(loanService.getLoanRequest(loanSeq, authentication));
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);
        }
    }

    // API 3. 대출 신청 모두 조회
    @GetMapping("/apply")
    public ResponseEntity<?> getAllLoanRequest(Authentication authentication){
        try{
            return ResponseEntity.ok(loanService.getAllLoanRequest(authentication));
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("모든 대출 신청 조회 실패");
        }
    }

    // API 4. 대출 이력 조회
    @GetMapping
    public ResponseEntity<?> getLoanHistory(Authentication authentication) {
        try {
            return ResponseEntity.ok(loanService.getLoan(authentication));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("대출 이력 조회 실패");
        }
    }

    // API 5. 대출중 이력 조회
    @GetMapping("/on")
    public ResponseEntity<?> getOnLoanHistory(Authentication authentication) {
        try {
            return ResponseEntity.ok(loanService.getOnLoan(authentication));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("대출중 이력 조회 실패");
        }
    }

    // API 6. 대금 이력 조회
    @GetMapping("/opp")
    public ResponseEntity<?> getLoanOppHistory(Authentication authentication) {
        try {
            return ResponseEntity.ok(loanService.getLoanOpp(authentication));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("대금 이력 조회 실패");
        }
    }

    // API 7. 대금중 이력 조회
    @GetMapping("/opp/on")
    public ResponseEntity<?> getOnLoanOppHistory(Authentication authentication) {
        try {
            return ResponseEntity.ok(loanService.getOnLoanOpp(authentication));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("대출중 이력 조회 실패");
        }
    }
}
