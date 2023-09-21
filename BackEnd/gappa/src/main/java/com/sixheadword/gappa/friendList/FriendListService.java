package com.sixheadword.gappa.friendList;

import com.sixheadword.gappa.friendList.response.FriendListResponseDto;
import com.sixheadword.gappa.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FriendListService {

    private final FriendListRepository friendListRepository;

    public ResponseEntity<?> friendList(Long member_id) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        try {
            List<FriendList> friendList = friendListRepository.findListById(member_id);
            List<FriendListResponseDto> dtos = new ArrayList<>();
            for (FriendList l : friendList) {
                User user = l.getToUser().getUserSeq() == member_id ? l.getFromUser() : l.getToUser();
                FriendListResponseDto friendListResponseDto = FriendListResponseDto.builder()
                        .profile_img(user.getProfileImg())
                        .user_name(user.getName())
                        .user_seq(user.getUserSeq())
                        .build();
                dtos.add(friendListResponseDto);
            }
            Collections.sort(dtos, Comparator.comparing(FriendListResponseDto::getUser_name));
            resultMap.put("message", "요청 성공");
            resultMap.put("list", dtos);
            status = HttpStatus.OK;
        } catch (Exception e) {
            resultMap.put("message", "요청 실패");
            resultMap.put("exception", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap, status);
    }
}
