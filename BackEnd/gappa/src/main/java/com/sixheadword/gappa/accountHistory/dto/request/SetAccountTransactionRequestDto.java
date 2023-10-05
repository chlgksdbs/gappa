package com.sixheadword.gappa.accountHistory.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Data
public class SetAccountTransactionRequestDto {

    private Long accountSeq;

}
