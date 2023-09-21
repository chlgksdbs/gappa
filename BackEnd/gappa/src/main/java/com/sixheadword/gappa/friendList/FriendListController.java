package com.sixheadword.gappa.friendList;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class FriendListController {

    private final FriendListService friendListService;

    // API 1. 친구 목록 조회
    @GetMapping("/friends")
    public ResponseEntity<?> friendList(Authentication authentication) {
        return friendListService.friendList(Long.parseLong(authentication.getName()));
    }
}
