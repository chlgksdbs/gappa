package com.sixheadword.gappa.FCM;

import com.sixheadword.gappa.FCM.request.FCMTokenDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class FCMController {

    private final FCMService fcmService;

    @PostMapping("/fcm/login")
    public ResponseEntity<?> saveToken(@RequestBody FCMTokenDto fcmTokenDto, Authentication authentication) {
        return fcmService.saveToken(fcmTokenDto, Long.parseLong(authentication.getName()));
    }

    @PostMapping("/fcm/push")
    public ResponseEntity<?> pushNotification(Authentication authentication) {
        return fcmService.pushNotification(Long.parseLong(authentication.getName()), "push 알림", "내용내용");
    }
}
