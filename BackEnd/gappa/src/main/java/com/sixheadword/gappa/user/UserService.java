package com.sixheadword.gappa.user;

import com.sixheadword.gappa.utils.JwtUtil;
import com.sixheadword.gappa.utils.RedisUtil;
import com.sixheadword.gappa.utils.SmsUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
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
    private final BCryptPasswordEncoder encoder;
    private final UserRepository userRepository;
    private final EntityManager em;

    private static final Long EXPIRATION_TIME = 5 * 60 * 1000L; // 문자인증만료시간(5분)

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
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public ResponseEntity<?> setUserInfo(Map<String, String> request) {
        Map<String, String> resultMap = new HashMap<>();
        HttpStatus httpStatus = null;

        String loginId = request.get("loginId");
        String loginPassword = request.get("loginPassword");
        String phone = request.get("phone");
        String name = request.get("name");
        String address = request.get("address");

        try {
            User user = new User(loginId, encoder.encode(loginPassword), phone, name, address);
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

    // 회원정보 수정
    public ResponseEntity<?> modifyUserInfo(Map<String, String> request, Long userSeq) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        String phone = request.get("phone");
        String address = request.get("address");
        try {
            User user = em.find(User.class, userSeq);
            user.setPhone(phone);
            user.setAddress(address);

            resultMap.put("message", "회원정보 수정 성공");
            status = HttpStatus.OK;
        } catch (Exception e) {
            resultMap.put("message", "회원정보 수정 중 에러 발생");
            resultMap.put("error", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    // 회원 탈퇴
    public ResponseEntity<?> deleteUserInfo(Long userSeq) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        try {
            User user = em.find(User.class, userSeq);
            user.setState(false);
            user.setExpiredAt(LocalDateTime.now());

            resultMap.put("messsage", "회원 탈퇴 성공");
            status = HttpStatus.OK;
        } catch (Exception e) {
            resultMap.put("message", "회원 탈퇴 실패");
            resultMap.put("error", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(resultMap, status);
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
            String existLoginId = userRepository.selectUserLoginIdByLoginId(loginId);

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

    // 간편 비밀번호 설정
    public ResponseEntity<?> setPinPassword(Map<String, String> request, String userSeq) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        try {
            redisUtil.setDataExpire(userSeq, encoder.encode(request.get("pinPassword")), EXPIRATION_TIME);
            resultMap.put("message", "간편 비밀번호 설정 성공, 확인 후 적용됩니다.");
            status = HttpStatus.OK;
        } catch (Exception e) {
            resultMap.put("message", "간편 비밀번호 설정 중 에러가 발생했습니다.");
            resultMap.put("error", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    // 간편 비밀번호 확인
    public ResponseEntity<?> checkPinPassword(Map<String, String> request, String userSeq) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        try {
            if (encoder.matches(request.get("pinPassword"), redisUtil.getData(userSeq))) {
                User user = em.find(User.class, Long.parseLong(userSeq));
                user.setPinPassword(encoder.encode(request.get("pinPassword")));

                resultMap.put("message", "간편 비밀번호 확인 완료");
                status = HttpStatus.OK;
            } else {
                resultMap.put("message", "간편 비밀번호가 일치하지 않습니다.");
                status = HttpStatus.BAD_REQUEST;
            }
        } catch (Exception e) {
            resultMap.put("message", "간편 비밀번호 확인 중 에러가 발생했습니다.");
            resultMap.put("error", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    // 아이디 찾기
    public ResponseEntity<?> findUserId(Map<String, String> request) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        String name = request.get("name");
        String phone = request.get("phone");

        try {
            String loginId = userRepository.selectUserLoginIdByNameAndPhone(name, phone);
            if (loginId != null) {
                resultMap.put("message", "아이디 찾기 성공");
                resultMap.put("data", loginId);
                status = HttpStatus.OK;
            } else {
                resultMap.put("message", "일치하는 아이디가 존재하지 않습니다.");
                status = HttpStatus.BAD_REQUEST;
            }
        } catch (Exception e) {
            resultMap.put("message", "아이디 찾기 중 에러 발생");
            resultMap.put("error", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    // 유저 조회
    public ResponseEntity<?> searchUserInfo(String loginId) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        try {
            User user = userRepository.findByLoginId(loginId);

            resultMap.put("profileImg", user.getProfileImg());
            resultMap.put("name", user.getName());
            resultMap.put("loginId", user.getLoginId());
            resultMap.put("phone", user.getPhone());
            resultMap.put("creditScore", user.getCreditScore());
            resultMap.put("message", "유저 조회 성공");
            status = HttpStatus.OK;
        } catch (Exception e) {
            resultMap.put("message", "유저 조회 중 에러가 발생했습니다.");
            resultMap.put("error", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    // 비밀번호 재설정
    public ResponseEntity<?> updateUserPw(Map<String, String> request) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        String loginId = request.get("loginId");
        String loginPassword = request.get("loginPassword");

        try {
            User user = userRepository.findByLoginId(loginId);
            user.setLoginPassword(encoder.encode(loginPassword));

            resultMap.put("message", "비밀번호 재설정 완료! 다시 로그인 해주세요.");
            status = HttpStatus.OK;
        } catch (Exception e) {
            resultMap.put("message", "비밀번호 재설정 중 에러 발생");
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
