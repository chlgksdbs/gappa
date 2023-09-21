package com.sixheadword.gappa.friendRequest;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class FriendRequestController {

    private final FriendRequestService friendRequestService;

    // API 1. 친구 신청
    @PostMapping("/friends")
    public ResponseEntity<?> friendRequest(@RequestBody Map<String, String> request){
        Long member_id = 1L; // 이 부분은 한윤이가 service 만들면 완성
        friendRequestService.friendRequest(member_id, request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // API 2. 친구 신청 응답
    public ResponseEntity<?> friendResponse(@RequestBody Map<String, String> request) {
        Long member_id = 1L; // 이 부분은 한윤이가 service 만들면 완성
        return friendRequestService.friendResponse(member_id, request);
    }
}
