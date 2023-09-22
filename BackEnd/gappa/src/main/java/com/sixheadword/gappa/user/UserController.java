package com.sixheadword.gappa.user;

import com.sixheadword.gappa.user.request.CheckPwRequestDto;
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
    @PutMapping
    public ResponseEntity<?> modifyUserInfo(@RequestBody Map<String, String> request, Authentication authentication) {
        return userService.modifyUserInfo(request, Long.parseLong(authentication.getName()));
    }

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

    // API 7. 간편 비밀번호 설정
    @PostMapping("/pin/set")
    public ResponseEntity<?> setPinPassword(@RequestBody Map<String, String> request, Authentication authentication) {
        return userService.setPinPassword(request, authentication.getName());
    }

    // API 8. 간편 비밀번호 확인
    @PostMapping("/pin/check")
    public ResponseEntity<?> checkPinPassword(@RequestBody Map<String, String> request, Authentication authentication) {
        return userService.checkPinPassword(request, authentication.getName());
    }

    // API 9. 아이디 찾기
    @PostMapping("/findid")
    public ResponseEntity<?> findUserId(@RequestBody Map<String, String> request) {
        return userService.findUserId(request);
    }

    // API 10. 유저 조회
    @GetMapping("/{loginId}")
    public ResponseEntity<?> searchUserInfo(@PathVariable("loginId") String loginId) {
        return userService.searchUserInfo(loginId);
    }

    // API 11. 비밀번호 재설정
    @PutMapping("/setpw")
    public ResponseEntity<?> updateUserPw(@RequestBody Map<String, String> request) {
        return userService.updateUserPw(request);
    }

    // API 12. 알림 조회
    @GetMapping("/alarm")
    public ResponseEntity<?> selectUserAlarm(Authentication authentication) {
        return userService.selectUserAlarm(Long.parseLong(authentication.getName()));
    }

    // API 13. 휴대폰 인증번호 전송
    @PostMapping("/phone/send")
    public ResponseEntity<?> sendVerificationCode(@RequestBody Map<String, String> request){
        return userService.sendVerificationCode(request);
    }

    // API 14. 휴대폰 인증번호 확인
    @PostMapping("/phone/check")
    public ResponseEntity<?> checkVerificationCode(@RequestBody Map<String, String> request){
        return userService.checkVerificationCode(request);
    }

    // API 15. 비밀번호 찾기 인증
    @PostMapping("/findpw")
    public ResponseEntity<?> checkVerificationPw(@RequestBody CheckPwRequestDto checkPwRequestDto){
        return userService.checkVerificationPw(checkPwRequestDto);
    }
}
