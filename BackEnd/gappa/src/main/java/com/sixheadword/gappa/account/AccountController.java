package com.sixheadword.gappa.account;

import com.sixheadword.gappa.account.dto.request.SetAccountTransactionRequestDto;
import com.sixheadword.gappa.account.dto.request.SetPrimaryReqeustDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/accounts")
public class AccountController {

    private final AccountService accountService;

    // API 1. 대표 계좌 설정
    @PostMapping("/primary")
    public ResponseEntity<?> setPrimaryAccount(@RequestBody SetPrimaryReqeustDto setPrimaryReqeustDto, Authentication authentication){
        try{
            accountService.setPrimaryAccount(setPrimaryReqeustDto, authentication);
            return ResponseEntity.status(HttpStatus.OK).build();
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("대표 계좌 설정 실패");
        }
    }

    // API 2. 대표 계좌 변경
    @PutMapping("/primary")
    public ResponseEntity<?> changePrimaryAccount(@RequestBody SetPrimaryReqeustDto setPrimaryReqeustDto, Authentication authentication){
        try{
            accountService.changePrimaryAccount(setPrimaryReqeustDto, authentication);
            return ResponseEntity.status(HttpStatus.OK).build();
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("전체 계좌 조회 실패");
        }
    }

    // API 3. 대표 계좌 조회
    @GetMapping("/primary")
    public ResponseEntity<?> showPrimaryAccount(Authentication authentication) {
        try{
            return ResponseEntity.ok(accountService.getPrimaryAccount(authentication));
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("전체 계좌 조회 실패");
        }
    }

    // API 4. 전체 계좌 조회
    @GetMapping("/{userSeq}")
    public ResponseEntity<?> showAllAccount(@PathVariable("userSeq") Long userSeq){
        try{
            return ResponseEntity.ok(accountService.getAllAcount(userSeq));
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("전체 계좌 조회 실패");
        }
    }

}



