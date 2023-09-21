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

    // API 3. 회원정보 수정

    // API 4. 회원탈퇴

    // API 5. 아이디 찾기

    // API 6. 신용점수 조회
    @GetMapping("/credit/{loginId}")
    public ResponseEntity<?> getUserCreditScore(@PathVariable String loginId, Authentication authentication) {
        return userService.getUserCreditScore(loginId + " " + authentication.getName());
    }

    // API 7. 휴대폰 인증번호 전송
    @PostMapping("/phone/send")
    public ResponseEntity<?> sendVerificationCode(@RequestBody Map<String, String> request){
        return userService.sendVerificationCode(request);
    }

    // API 8. 휴대폰 인증번호 확인
    @PostMapping("/phone/check")
    public ResponseEntity<?> checkVerificationCode(@RequestBody Map<String, String> request){
        return userService.checkVerificationCode(request);
    }
}
