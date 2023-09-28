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
    private Long fromUser;
    private Long principal;
    private LocalDateTime startDate;
    private char status;

}
