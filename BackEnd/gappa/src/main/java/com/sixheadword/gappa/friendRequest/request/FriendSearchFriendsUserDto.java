package com.sixheadword.gappa.friendRequest.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class FriendSearchFriendsUserDto {
    private String name;
    private String phone;
}
