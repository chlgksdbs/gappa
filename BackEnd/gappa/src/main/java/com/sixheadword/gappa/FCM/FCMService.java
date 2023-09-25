package com.sixheadword.gappa.FCM;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.WebpushConfig;
import com.google.firebase.messaging.WebpushNotification;
import com.sixheadword.gappa.FCM.request.FCMTokenDto;
import com.sixheadword.gappa.user.User;
import com.sixheadword.gappa.user.UserRepository;
import com.sixheadword.gappa.utils.RedisUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FCMService {

    private final UserRepository userRepository;
    private final RedisUtil redisUtil;

    // FireBase 토큰 redis에 저장
    public ResponseEntity<?> saveToken(FCMTokenDto fcmTokenDto, long member_id) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        try {
            User user = userRepository.findById(member_id).orElseThrow(() -> new IllegalArgumentException("회원을 찾을 수 없습니다."));
            redisUtil.save(user.getPhone(), fcmTokenDto.getToken());
            resultMap.put("message", "요청 성공");
            status = HttpStatus.OK;
        } catch (Exception e) {
            resultMap.put("message", "요청 실패");
            resultMap.put("exception", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap, status);
    }

    // 사용자에게 push 알림
    public ResponseEntity<?> pushNotification(long member_id, String title, String content){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        try {
            User user = userRepository.findById(member_id).orElseThrow(() -> new IllegalArgumentException("회원을 찾을 수 없습니다."));
            if (!redisUtil.hasKey(user.getPhone())) {
                resultMap.put("message", "유저의 FireBase 토큰이 없습니다.");
                status = HttpStatus.BAD_REQUEST;
            }
            else {
                String token = redisUtil.getData(user.getPhone());
                Message message = Message.builder()
                        .setToken(token)
                        .setWebpushConfig(WebpushConfig.builder()
                                .putHeader("ttl", "300")
                                .setNotification(new WebpushNotification(title, content))
                                .build())
                        .build();
                String response = FirebaseMessaging.getInstance().sendAsync(message).get();
                status = HttpStatus.OK;
                resultMap.put("response", response);
            }
        } catch (Exception e) {
            resultMap.put("message", "요청 실패");
            resultMap.put("exception", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(resultMap, status);
    }

}