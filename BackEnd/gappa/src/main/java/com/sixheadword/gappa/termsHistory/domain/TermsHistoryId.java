package com.sixheadword.gappa.termsHistory.domain;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Embeddable
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class TermsHistoryId implements Serializable {

    // userSeq: 사용자 정보 일련번호
    @Column(name = "user_seq")
    private Long userSeq;

    // termsSeq: 약관 정보 일련번호
    @Column(name = "terms_seq")
    private Long termsSeq;
}
