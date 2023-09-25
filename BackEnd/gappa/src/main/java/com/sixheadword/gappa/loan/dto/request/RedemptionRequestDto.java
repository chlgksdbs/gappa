package com.sixheadword.gappa.loan.dto.request;

import lombok.*;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class RedemptionRequestDto {

    private Long accountSeq;
    private Long loanSeq;
    private Long amount;

}
