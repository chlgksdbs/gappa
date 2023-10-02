package com.sixheadword.gappa.loan.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Data
public class FailLoanRequestDto {

    private Long loanSeq;

}
