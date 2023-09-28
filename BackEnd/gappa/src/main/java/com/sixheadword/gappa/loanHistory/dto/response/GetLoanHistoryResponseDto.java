package com.sixheadword.gappa.loanHistory.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Data
public class GetLoanHistoryResponseDto {

    // 대출 및 대금 관련 상세 조회

    // 채권자
    private String toUserName;
    // 채무자
    private String fromUserName;
    // 대출 실행일
    private LocalDateTime startDate;
    // 상환 예정일
    private LocalDateTime redemptionDate;
    // 상환 완료일
    private LocalDateTime expiredDate;
    // 대출 원금
    private Long principal;
    // 대출 잔액 (원금 - 중도 상환금)
    private Long balance;
    // 대출 이자
    private Long interest;
    // 중도 상환금
    private Long redemptionMoney;

}
