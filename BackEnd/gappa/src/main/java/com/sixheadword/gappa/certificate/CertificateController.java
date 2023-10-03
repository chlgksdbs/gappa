package com.sixheadword.gappa.certificate;

import com.sixheadword.gappa.certificate.request.CertificatePwDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/certificate")
public class CertificateController {

    private final CertificateService certificateService;

    // API 1. 공인인증서 발급
    @PostMapping("/issuance")
    public ResponseEntity<?> issuanceCertificate(@RequestBody CertificatePwDto certificatePwDto, Authentication authentication) {
        return certificateService.issuanceCertificate(Long.parseLong(authentication.getName()), certificatePwDto);
    }

    // API 2. 공인인증서 비밀번호 설정
    @PostMapping("/set")
    public ResponseEntity<?> setCertificatePw(@RequestBody CertificatePwDto certificatePwDto, Authentication authentication){
        return certificateService.setCertificatePw(Long.parseLong(authentication.getName()), certificatePwDto);
    }

    // API 3. 공인인증서 비밀번호 인증
    @PostMapping("/validate")
    public ResponseEntity<?> validateCertificatePw(@RequestBody CertificatePwDto certificatePwDto, Authentication authentication){
        return certificateService.validateCertificatePw(Long.parseLong(authentication.getName()), certificatePwDto);
    }
}
