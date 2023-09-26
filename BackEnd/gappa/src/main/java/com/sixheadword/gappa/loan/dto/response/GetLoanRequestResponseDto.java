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
public class GetLoanRequestResponseDto {

    private String toUser;
    private String fromUser;
    private Long principal;
    private LocalDateTime startDate;
    private LocalDateTime redemptionDate;
    private String bank;
    private String accountNumber;

}
