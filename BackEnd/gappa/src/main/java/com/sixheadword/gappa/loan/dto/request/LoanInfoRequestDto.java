package com.sixheadword.gappa.loan.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Data
public class LoanInfoRequestDto {

    // 채무자
    private Long fromUser;
    // 채권자
    private Long toUser;
    // 대출원금
    private Long principal;
    // 카테코리
    private String loanReasonCategory;
    // 사유
    private String loanOtherReason;
    // 실행일자
    private LocalDateTime startDate;
    // 희망 상환일자
    private LocalDateTime redemptionDate;

}
