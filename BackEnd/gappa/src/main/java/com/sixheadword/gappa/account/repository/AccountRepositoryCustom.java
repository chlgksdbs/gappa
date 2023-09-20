package com.sixheadword.gappa.account.repository;

import com.sixheadword.gappa.account.Account;

public interface AccountRepositoryCustom {

    // 대표 계좌 설정
    public void setPrimaryAccount(Long userSeq, Long accountSeq);

    // 현재 대표 계좌 해제
    public void unsetPrimaryAccount(Long userSeq, Long accountSeq);

    // 대표 계좌 조회
    public Account findPrimaryByUserSeq(Long userSeq);

}
