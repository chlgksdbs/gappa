package com.sixheadword.gappa.friendRequest;

import com.sixheadword.gappa.friendList.FriendList;
import com.sixheadword.gappa.friendList.FriendListRepository;
import com.sixheadword.gappa.friendRequest.response.FriendRequestListResponseDto;
import com.sixheadword.gappa.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FriendRequestService {

    private final FriendRequestRepository friendRequestRepository;
    private final FriendListRepository friendListRepository;
    private final UserRepository userRepository;

    // 친구 요청 보내기
    @Transactional
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
    @Transactional
    public ResponseEntity<?> friendResponse(Long member_id, Map<String, String> request){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        Long id = Long.parseLong(request.get("request_seq"));
        String res = request.get("response");
        try {
            FriendRequest friendRequest = friendRequestRepository.findById(id);
            if (res.equals("T")) {
                friendListRepository.save(new FriendList(friendRequest));
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

        } catch (Exception e) {
            resultMap.put("message", "요청 실패");
            resultMap.put("exception", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap, status);
    }

    // 친구 신청 목록 조회
    public ResponseEntity<?> friendRequestList(long member_id) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        try {
            List<FriendRequest> requests = friendRequestRepository.findRequestsById(member_id);
            List<FriendRequestListResponseDto> dtos = new ArrayList<>();
            for (FriendRequest r : requests) {
                FriendRequestListResponseDto friendRequestListResponseDto = FriendRequestListResponseDto.builder()
                        .request_seq(r.getFriendRequestSeq())
                        .to_user_name(r.getFromUser().getName())
                        .request_date(r.getRequestDate())
                        .profile_img(r.getToUser().getProfileImg())
                        .build();
                dtos.add(friendRequestListResponseDto);
            }
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
