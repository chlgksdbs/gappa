package com.sixheadword.gappa.accountHistory;

import com.sixheadword.gappa.account.dto.request.SetAccountTransactionRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/accounts/history")
public class AccountHistoryController {

    private final AccountHistoryService accountHistoryService;

    // API 1. 계좌 거래 내역 상세조회
    @PostMapping("/detail")
    public ResponseEntity<?> showTransactionDetail(Authentication authentication, @RequestBody SetAccountTransactionRequestDto setTransactionRequestDto){
        try{
            return ResponseEntity.ok(accountHistoryService.getTransactionDetail(authentication, setTransactionRequestDto));
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("거래 내역 상세조회에 실패");
        }
    }
}
