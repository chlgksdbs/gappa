package com.sixheadword.gappa.friendList.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class FriendListResponseDto {

    private Long user_seq;
    private String user_name;
    private String profile_img;
    private String phone;
}
