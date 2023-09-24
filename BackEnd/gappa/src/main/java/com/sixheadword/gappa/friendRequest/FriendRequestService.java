package com.sixheadword.gappa.friendRequest;

import com.sixheadword.gappa.friendList.FriendList;
import com.sixheadword.gappa.friendList.FriendListRepository;
import com.sixheadword.gappa.friendList.response.FriendListResponseDto;
import com.sixheadword.gappa.friendRequest.request.FriendSearchFriendsUserDto;
import com.sixheadword.gappa.friendRequest.response.FriendRequestListResponseDto;
import com.sixheadword.gappa.user.User;
import com.sixheadword.gappa.user.UserCustomRepository;
import com.sixheadword.gappa.user.UserRepository;
import com.sixheadword.gappa.webAlarm.WebAlarm;
import com.sixheadword.gappa.webAlarm.WebAlarmRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FriendRequestService {

    private final FriendRequestRepository friendRequestRepository;
    private final FriendListRepository friendListRepository;
    private final UserRepository userRepository;
    private final UserCustomRepository userCustomRepository;
    private final WebAlarmRepository webAlarmRepository;

    // 친구 요청 보내기
    @Transactional
    public ResponseEntity<?> friendRequest(Long member_id, Map<String, String> request){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        try {
            Long to_user_seq = Long.parseLong(request.get("to_user"));
            User from_user = userRepository.findById(member_id).orElseThrow(() -> new IllegalArgumentException("회원을 찾을 수 없습니다."));
            User to_user = userRepository.findById(to_user_seq).orElseThrow(() -> new IllegalArgumentException("회원을 찾을 수 없습니다."));
            FriendRequest friendRequest = new FriendRequest(from_user, to_user);
            friendRequestRepository.save(friendRequest);
            //알림 만드는 로직
            String alarmContent = to_user.getName() + "님에게 친구 신청이 왔어요!";
            WebAlarm webAlarm = new WebAlarm(to_user, from_user, 'F', alarmContent);
            webAlarmRepository.save(webAlarm);

            //푸시 알림 보내기

            status = HttpStatus.OK;
            resultMap.put("message", "요청성공");
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

    public ResponseEntity<?> searchFriendsUser(long member_id, FriendSearchFriendsUserDto request) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        User user = userCustomRepository.findByNamePhone(request.getName(), request.getPhone()).orElse(null);
        if(user == null) {
            resultMap.put("status", "N");
            resultMap.put("message", "검색한 사람이 존재하지 않습니다.");
        } else if(friendListRepository.findByUserSeqs(member_id, user.getUserSeq()).orElse(null) != null) {
            resultMap.put("status", "A");
            resultMap.put("message", "이미 친구입니다.");
        } else if( friendRequestRepository.existsByUserSeqs(member_id, user.getUserSeq()) ) {
            resultMap.put("status", "R");
            resultMap.put("message", "이미 친구 신청을 했습니다.");
        } else if( friendRequestRepository.existsByUserSeqs(user.getUserSeq(), member_id)  ) {
            resultMap.put("status", "P");
            resultMap.put("message", "친구 신청을 이미 받았습니다.");
        } else { // 친구신청 가능 유저
            FriendListResponseDto friendListResponseDto = FriendListResponseDto.builder()
                    .profile_img(user.getProfileImg())
                    .user_name(user.getName())
                    .user_seq(user.getUserSeq())
                    .phone(user.getPhone())
                    .build();
            resultMap.put("user", friendListResponseDto);
            resultMap.put("status", "C");
            resultMap.put("message", "친구 신청이 가능합니다.");
        }
        status = HttpStatus.OK;
        return new ResponseEntity<>(resultMap, status);
    }

}
