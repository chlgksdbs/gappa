package com.sixheadword.gappa.loan.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Data
public class GetLoanResponseDto {

    private Long loanSeq;
    private String toUser;
    private String profileImg;
    private Long principal;
    private Long restMoney;
    private LocalDateTime startDate;
    private LocalDateTime redemptionDate;
    private char status;

}
