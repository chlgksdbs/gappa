package com.sixheadword.gappa.friendRequest;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class FriendRequestService {

    private FriendRequestRepository friendRequestRepository;

    // 친구 요청 보내기
    public void friendRequest(Long member_id, Map<String, String> request){
        Long to_user = Long.parseLong(request.get("to_user"));
        FriendRequest friendRequest = new FriendRequest(member_id, to_user);
        //알림 만드는 로직

        //알림 보내는 로직

        friendRequestRepository.save(friendRequest);
    }
}
