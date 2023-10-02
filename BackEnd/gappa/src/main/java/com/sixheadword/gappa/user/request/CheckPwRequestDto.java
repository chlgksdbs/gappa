package com.sixheadword.gappa.user.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class CheckPwRequestDto {

    String id;
    String phone;
    String code;
}
