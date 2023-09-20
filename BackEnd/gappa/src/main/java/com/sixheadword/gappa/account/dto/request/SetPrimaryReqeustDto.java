package com.sixheadword.gappa.account.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class SetPrimaryReqeustDto {

    private Long userSeq;
    private Long accountSeq;

}
