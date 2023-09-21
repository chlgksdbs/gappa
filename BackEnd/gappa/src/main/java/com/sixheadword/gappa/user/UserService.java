package com.sixheadword.gappa.user;

import com.sixheadword.gappa.utils.JwtUtil;
import com.sixheadword.gappa.utils.RedisUtil;
import com.sixheadword.gappa.utils.SmsUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    @Value("{jwt.secret.key}")
    private String JwtSecretKey;

    private final SmsUtil smsUtil;
    private final RedisUtil redisUtil;
    private final UserRepository userRepository;
    private static final int EXPIRATION_TIME = 300000; // 문자인증만료시간(5분)

    // 로그인
    public ResponseEntity<?> login(Map<String, String> request) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        JwtUtil jwtUtil = new JwtUtil();

        try {
            User user = userRepository.findByLoginIdAndLoginPassword(request.get("loginId"), request.get("loginPassword"));
            resultMap.put("token", jwtUtil.createJwt(Long.toString(user.getUserSeq()), JwtSecretKey));
            resultMap.put("message", "로그인 완료");
            status = HttpStatus.OK;
        } catch (Exception e) {
            resultMap.put("message", "로그인 실패");
            resultMap.put("error", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        // 인증과정 생략
        return new ResponseEntity<>(resultMap, status);
    }

    // 회원가입
    public ResponseEntity<?> setUserInfo(Map<String, String> request) {
        Map<String, String> resultMap = new HashMap<>();
        HttpStatus httpStatus = null;

        String loginId = request.get("loginId");
        String loginPassword = request.get("loginPassword");
        String phone = request.get("phone");
        String name = request.get("name");
        String address = request.get("address");

        try {
            User user = new User(loginId, loginPassword, phone, name, address);
            userRepository.save(user);
            resultMap.put("message", "회원가입 성공");
            httpStatus = HttpStatus.OK;
        } catch (Exception e) {
            resultMap.put("message", "회원가입 실패");
            resultMap.put("error", e.getMessage());
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(resultMap, httpStatus);
    }

    // 신용점수 조회
    public ResponseEntity<?> getUserCreditScore(Long userSeq) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        try {
            int creditScore = userRepository.selectUserCreditScore(userSeq);
            resultMap.put("credit_score", creditScore);
            resultMap.put("message", "신용점수 조회 성공");
            status = HttpStatus.OK;
        } catch (Exception e) {
            resultMap.put("message", "신용점수 조회 실패");
            resultMap.put("error", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    // 아이디 중복확인
    public ResponseEntity<?> checkIdDuplication(Map<String, String> request) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        String loginId = request.get("loginId");

        try {
            String existLoginId = userRepository.selectUserLoginId(loginId);

            if (existLoginId != null) {
                resultMap.put("code", false);
                resultMap.put("message", "이미 해당 아이디가 존재합니다.");
            } else {
                resultMap.put("code", true);
                resultMap.put("message", "아이디 중복확인 성공");
            }
            status = HttpStatus.OK;
        } catch (Exception e) {
            resultMap.put("message", "아이디 중복확인 에러");
            resultMap.put("error", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    // 휴대폰 인증번호 메세지 전송
    public ResponseEntity<?> sendVerificationCode(Map<String, String> request) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        String phoneNumber = request.get("phoneNumber");
        Random rand = new Random();
        int number = rand.nextInt(1000000);
        String strNumber = String.format("%06d", number);
        redisUtil.setDataExpire(phoneNumber, strNumber, EXPIRATION_TIME);
        try {
            smsUtil.sendSMS(phoneNumber, smsUtil.makeSmsContent(strNumber));
            resultMap.put("message", "전송완료");
            status = HttpStatus.OK;
        } catch (Exception e) {
            resultMap.put("message", "전송 실패");
            resultMap.put("exception", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap, status);
    }

    // 휴대폰 인증번호 확인
    public ResponseEntity<?> checkVerificationCode(Map<String, String> request) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        String phoneNumber = request.get("phoneNumber");
        String code = request.get("code");
        boolean verified = code.equals(redisUtil.getData(phoneNumber));
        if (verified) {
            resultMap.put("message", "인증완료");
            status = HttpStatus.ACCEPTED;
        } else {
            resultMap.put("message", "인증실패");
            status = HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity<>(resultMap, status);
    }
}
