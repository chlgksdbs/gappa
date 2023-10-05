package com.sixheadword.gappa.friendList.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FriendDeleteListRequestDto {

    private List<UserSeqDto> list;

    @Data
    public static class UserSeqDto {
        @JsonProperty("user_seq")
        private Long userSeq;
    }
}
