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
public class GetLoanOppResponseDto {

    private Long loanSeq;
    private String fromUser;
    private String profileImg;
    private Long principal;
    private LocalDateTime startDate;
    private LocalDateTime redemptionDate;
    private char status;

}
