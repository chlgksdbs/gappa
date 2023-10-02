package com.sixheadword.gappa.loanHistory.dto.response;

import com.sixheadword.gappa.loanHistory.entity.Type;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@RequiredArgsConstructor
@Data
@Builder
public class GetLoanTransactionResponseDto {

    private Long loanHistorySeq;
    private String toUser;
    private String type;
    private Long amount;
    private Long oldRedemptionMoney;
    private Long newRedemptionMoney;
    private LocalDateTime transactionDate;

}
