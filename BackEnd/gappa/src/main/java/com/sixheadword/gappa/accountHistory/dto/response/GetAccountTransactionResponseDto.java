package com.sixheadword.gappa.accountHistory.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Data
public class GetAccountTransactionResponseDto {

    private Long accountHistorySeq;
    private String toUser;
    private Long oldBalance;
    private Long newBalance;
    private Long amount;
    private LocalDateTime createdAt;
    private boolean accountType;
    private String profileImg;

}
