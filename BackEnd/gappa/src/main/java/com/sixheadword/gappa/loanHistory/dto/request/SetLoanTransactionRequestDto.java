package com.sixheadword.gappa.loanHistory.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@RequiredArgsConstructor
@Data
@Builder
public class SetLoanTransactionRequestDto {

    private Long loanSeq;

}
