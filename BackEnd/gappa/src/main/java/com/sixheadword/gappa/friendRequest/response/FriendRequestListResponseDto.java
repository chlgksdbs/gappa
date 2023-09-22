package com.sixheadword.gappa.friendRequest.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class FriendRequestListResponseDto {

    private Long request_seq;
    private String to_user_name;
    private String profile_img;
    private LocalDateTime request_date;
}
