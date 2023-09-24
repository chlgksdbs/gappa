package com.sixheadword.gappa.friendList;

import com.sixheadword.gappa.friendList.request.FriendDeleteListRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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

    // API 2. 친구 삭제
    @PostMapping("/friends")
    public ResponseEntity<?> deleteFriend(@RequestBody FriendDeleteListRequestDto friendDeleteListRequestDto, Authentication authentication) {
        return friendListService.deleteFriend(friendDeleteListRequestDto.getList(), Long.parseLong(authentication.getName()));
    }
}
