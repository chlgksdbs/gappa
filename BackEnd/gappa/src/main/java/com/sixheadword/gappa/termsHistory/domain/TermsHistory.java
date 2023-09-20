package com.sixheadword.gappa.termsHistory.domain;

import com.sixheadword.gappa.terms.Terms;
import com.sixheadword.gappa.user.User;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

// TermsHistory: 약관 동의이력
@Getter
@Entity
@Table(name = "TERMS_HISTORY")
public class TermsHistory {

    @EmbeddedId
    private TermsHistoryId termsHistoryId;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("user_seq")
    User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("terms_seq")
    Terms terms;

    // state: 동의여부
    @Column(length = 1, nullable = false)
    private char state;

    // agreeDate: 동의일자
    @Column(name = "agree_date", nullable = false)
    private LocalDateTime agreeDate;
}
