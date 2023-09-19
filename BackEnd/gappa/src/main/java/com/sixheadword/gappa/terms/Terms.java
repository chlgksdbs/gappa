package com.sixheadword.gappa.terms;

import lombok.Getter;

import javax.persistence.*;

// Terms: 약관 테이블
@Getter
@Entity
@Table(name = "TERMS")
public class Terms {

    // termsSeq: 약관 일련번호
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "terms_seq", unique = true, nullable = false)
    private Long termsSeq;
    
    // termsName: 약관명
    @Column(name = "terms_name", length = 30, nullable = false)
    private String termsName;
    
    // termsContent: 약관내용
    @Column(name = "terms_content", length = 100, nullable = false)
    private String termsContent;
    
    // required: 필수여부
    @Column(length = 1, nullable = false)
    private char required;
}
