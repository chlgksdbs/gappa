package com.sixheadword.gappa.FCM;

import com.sixheadword.gappa.FCM.request.FCMTokenDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class FCMController {

    private final FCMService fcmService;

    // API 1. FCM 토큰 저장
    @PostMapping("/fcm")
    public ResponseEntity<?> saveToken(@RequestBody FCMTokenDto fcmTokenDto, Authentication authentication) {
        return fcmService.saveToken(fcmTokenDto, Long.parseLong(authentication.getName()));
    }

    // API 2. FCM 토큰 삭제
    @DeleteMapping("/fcm")
    public ResponseEntity<?> deleteToken(Authentication authentication) {
        return fcmService.deleteToken(Long.parseLong(authentication.getName()));
    }

    // 임시
    @PostMapping("/fcm/push")
    public ResponseEntity<?> pushNotification(Authentication authentication) {
        return fcmService.pushNotification(Long.parseLong(authentication.getName()), "내용내용");
    }
}
