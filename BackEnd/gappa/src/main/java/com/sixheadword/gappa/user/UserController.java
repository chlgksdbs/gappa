package com.sixheadword.gappa.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    // API 1. 로그인
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        return userService.login(request);
    }

    // API 2. 회원가입
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, String> request) {
        return userService.setUserInfo(request);
    }

    // API 3. 회원정보 수정

    // API 4. 회원탈퇴
    @DeleteMapping
    public ResponseEntity<?> deleteUserInfo(Authentication authentication) {
        return userService.deleteUserInfo(Long.parseLong(authentication.getName()));
    }

    // API 5. 신용점수 조회
    @GetMapping("/credit")
    public ResponseEntity<?> getUserCreditScore(Authentication authentication) {
        return userService.getUserCreditScore(Long.parseLong(authentication.getName()));
    }

    // API 6. 아이디 중복확인
    @PostMapping("/checkid")
    public ResponseEntity<?> checkIdDuplication(@RequestBody Map<String, String> request) {
        return userService.checkIdDuplication(request);
    }

    @PostMapping("/phone/send")
    public ResponseEntity<?> sendVerificationCode(@RequestBody Map<String, String> request){
        return userService.sendVerificationCode(request);
    }

    @PostMapping("/phone/check")
    public ResponseEntity<?> checkVerificationCode(@RequestBody Map<String, String> request){
        return userService.checkVerificationCode(request);
    }
}
