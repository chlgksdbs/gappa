package com.sixheadword.gappa.friendRequest;

import com.sixheadword.gappa.friendRequest.request.FriendSearchFriendsUserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class FriendRequestController {

    private final FriendRequestService friendRequestService;

    // API 1. 친구 신청
    @PostMapping("/friends")
    public ResponseEntity<?> friendRequest(@RequestBody Map<String, String> request, Authentication authentication){
        return friendRequestService.friendRequest(Long.parseLong(authentication.getName()), request);
    }

    // API 2. 친구 신청 응답
    @PostMapping("/friends/response")
    public ResponseEntity<?> friendResponse(@RequestBody Map<String, String> request, Authentication authentication) {
        return friendRequestService.friendResponse(Long.parseLong(authentication.getName()), request);
    }

    // API 3. 친구 신청 목록 조회
    @GetMapping("/friends/request")
    public ResponseEntity<?> friendRequestList(Authentication authentication) {
        return friendRequestService.friendRequestList(Long.parseLong(authentication.getName()));
    }

    // API 4. 친구 신청할 유저 조회
    @PostMapping("/friends/user")
    public ResponseEntity<?> searchFriendsUser(@RequestBody FriendSearchFriendsUserDto friendSearchFriendsUserDto, Authentication authentication) {
        return friendRequestService.searchFriendsUser(Long.parseLong(authentication.getName()), friendSearchFriendsUserDto);
    }
}
