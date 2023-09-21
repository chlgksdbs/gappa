package com.sixheadword.gappa.creditRating;

import lombok.Getter;

import javax.persistence.*;

// CreditRating: 신용등급
@Getter
@Entity
@Table(name = "CREDIT_RATING")
public class CreditRating {

    // creditRatingSeq: 신용등급 일련번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "credit_rating_seq", unique = true, nullable = false)
    private Long creditRatingSeq;

    // name: 등급명
    @Column(length = 50, nullable = false)
    private String name;

    // scoreStartRange: 시작 점수 범위
    @Column(name = "score_start_range", nullable = false)
    private int scoreStartRange;

    // scoreEndRange: 끝 점수 범위
    @Column(name = "score_end_range", nullable = false)
    private int scoreEndRange;
}
