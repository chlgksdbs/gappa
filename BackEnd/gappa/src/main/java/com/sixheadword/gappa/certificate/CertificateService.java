package com.sixheadword.gappa.certificate;

import com.sixheadword.gappa.certificate.request.CertificatePwDto;
import com.sixheadword.gappa.user.User;
import com.sixheadword.gappa.user.UserRepository;
import com.sixheadword.gappa.utils.RSAUtil;
import com.sixheadword.gappa.utils.RedisUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.KeyPair;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CertificateService {

    private final RedisUtil redisUtil;
    private final RSAUtil rsaUtil;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;

    // 공인인증서 발급
    public ResponseEntity<?> issuanceCertificate(Long member_id) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        try {
            User user = userRepository.findById(member_id).orElseThrow(() -> new IllegalArgumentException("회원을 찾을 수 없습니다."));
            // RSA 키쌍을 생성
            KeyPair keyPair = rsaUtil.genRSAKeyPair();

            PublicKey publicKey = keyPair.getPublic();
            PrivateKey privateKey = keyPair.getPrivate();

            // 개인키
            redisUtil.save(user.getPhone() + "PK", Base64.getEncoder().encodeToString(privateKey.getEncoded()));
            // 공개키
            resultMap.put("message", "요청 성공");
            resultMap.put("publicKey", Base64.getEncoder().encodeToString(publicKey.getEncoded()));
            status = HttpStatus.OK;
        } catch (Exception e) {
            resultMap.put("message", "요청 실패");
            resultMap.put("exception", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap, status);
    }

    // 공인인증서 비밀번호 설정
    public ResponseEntity<?> setCertificatePw(long member_id, CertificatePwDto certificatePwDto) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        try {
            User user = userRepository.findById(member_id).orElseThrow(() -> new IllegalArgumentException("회원을 찾을 수 없습니다."));
            String base64PrivateKey = redisUtil.getData(user.getPhone() + "PK");
            PrivateKey privateKey = RSAUtil.getPrivateKeyFromBase64Encrypted(base64PrivateKey);
            String pw = RSAUtil.decryptRSA(certificatePwDto.getPw(), privateKey);
            System.out.println("pw = " + pw);
            redisUtil.save(user.getPhone() + "PW", encoder.encode(pw));
            resultMap.put("message", "요청 성공");
            status = HttpStatus.OK;
        }   catch (Exception e) {
            resultMap.put("message", "요청 실패");
            resultMap.put("exception", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap, status);
    }

    // 공인인증서 비밀번호 인증
    public ResponseEntity<?> validateCertificatePw(long member_id, CertificatePwDto certificatePwDto) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        try {
            User user = userRepository.findById(member_id).orElseThrow(() -> new IllegalArgumentException("회원을 찾을 수 없습니다."));
            String base64PrivateKey = redisUtil.getData(user.getPhone() + "PK");
            PrivateKey privateKey = RSAUtil.getPrivateKeyFromBase64Encrypted(base64PrivateKey);
            String pw = RSAUtil.decryptRSA(certificatePwDto.getPw(), privateKey);
            if(encoder.matches(pw, redisUtil.getData(user.getPhone()) + "PW")){
                resultMap.put("message", "인증 성공");
                status = HttpStatus.OK;
            } else {
                resultMap.put("message", "인증 실패");
                status = HttpStatus.BAD_REQUEST;
            }
        }   catch (Exception e) {
            resultMap.put("message", "요청 실패");
            resultMap.put("exception", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap, status);
    }
}
