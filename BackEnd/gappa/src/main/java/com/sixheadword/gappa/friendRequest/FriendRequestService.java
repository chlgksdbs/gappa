package com.sixheadword.gappa.friendRequest;

import com.sixheadword.gappa.friendList.FriendList;
import com.sixheadword.gappa.friendList.FriendListRepository;
import com.sixheadword.gappa.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class FriendRequestService {

    private final FriendRequestRepository friendRequestRepository;
    private final FriendListRepository friendListRepository;
    private final UserRepository userRepository;

    // 친구 요청 보내기
    public ResponseEntity<?> friendRequest(Long member_id, Map<String, String> request){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        try {
            Long to_user = Long.parseLong(request.get("to_user"));
            FriendRequest friendRequest = new FriendRequest(userRepository.getReferenceById(member_id), userRepository.getReferenceById(to_user));
            friendRequestRepository.save(friendRequest);
            resultMap.put("message", "요청성공");
            status = HttpStatus.OK;
            //알림 만드는 로직

            //websocket 알림 보내는 로직

        } catch (Exception e) {
            resultMap.put("message", "요청실패");
            resultMap.put("exception", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap, status);
    }

    // 친구 신청 응답
    public ResponseEntity<?> friendResponse(Long member_id, Map<String, String> request){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        Long id = Long.parseLong(request.get("id"));
        String res = request.get("response");
        try {
            FriendRequest friendRequest = friendRequestRepository.findById(id);
            if (res.equals("T")) {
                friendRequest.updateState('A');
                resultMap.put("message", "친구요청 승인 성공");
                status = HttpStatus.OK;
            } else if (res.equals("F")) {
                friendRequest.updateState('R');
                resultMap.put("message", "친구요청 거절 성공");
                status = HttpStatus.OK;
            } else {
                resultMap.put("message", "잘못된 요청입니다");
                status = HttpStatus.BAD_REQUEST;
            }
            friendRequestRepository.save(friendRequest);
            FriendList friendList = new FriendList(friendRequest);
            friendListRepository.save(friendList);
        } catch (Exception e) {
            resultMap.put("message", "요청 실패");
            resultMap.put("exception", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap, status);
    }
}
