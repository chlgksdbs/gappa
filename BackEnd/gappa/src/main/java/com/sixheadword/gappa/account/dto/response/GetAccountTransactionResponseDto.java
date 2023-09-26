package com.sixheadword.gappa.account.dto.response;

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

    private Long accountSeq;
    private Long oldBalance;
    private Long newBalance;
    private Long amount;
    private LocalDateTime createdAt;
    private boolean accountType;
    private String profileImg;

}
