package com.sixheadword.gappa.account.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class GetAccountResponseDto {

    private Long account_seq;
    private String account_number;
    private String bank;
    private Long balance;

}
