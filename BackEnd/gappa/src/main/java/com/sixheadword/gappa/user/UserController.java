package com.sixheadword.gappa.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    // API 1. 휴대폰 인증번호 전송
    @PostMapping("/phone/send")
    public ResponseEntity<?> sendVerificationCode(@RequestBody Map<String, String> request){
        return userService.sendVerificationCode(request);
    }

    // API 2. 휴대폰 인증번호 확인
    @PostMapping("/phone/check")
    public ResponseEntity<?> checkVerificationCode(@RequestBody Map<String, String> request){
        return userService.checkVerificationCode(request);
    }
}
