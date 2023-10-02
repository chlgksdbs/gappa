package com.sixheadword.gappa.allAccept;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class AllAcceptController {

    @GetMapping("/accept")
    public ResponseEntity<?> allAccept() {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;

        resultMap.put("message", "Hello, Gappa!");

        return new ResponseEntity<>(resultMap, status);
    }
}
