package com.sixheadword.gappa.loanHistory;

import com.sixheadword.gappa.loan.Loan;
import com.sixheadword.gappa.loan.repository.LoanRepository;
import com.sixheadword.gappa.loanHistory.dto.response.GetLoanHistoryResponseDto;

import com.sixheadword.gappa.loanHistory.repository.LoanHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class LoanHistoryService {

    private LoanHistoryRepository loanHistoryRepository;
    private LoanRepository loanRepository;

    // 대출 및 대금 이력 상세조회
    public GetLoanHistoryResponseDto getLoanHistory(int type, Long loanSeq, Authentication authentication) {
        Loan loan = loanRepository.findById(loanSeq).orElse(null);
        // type = 0 : 대출, type = 1 : 대금
        if((loan != null)
                && (type == 0 && Long.parseLong(authentication.getName()) == loan.getFromUser().getUserSeq())
                || (type == 1 && Long.parseLong(authentication.getName()) == loan.getToUser().getUserSeq())){
            return GetLoanHistoryResponseDto.builder()
                    .toUserName(loan.getToUser().getName())
                    .fromUserName(loan.getFromUser().getName())
                    .startDate(loan.getStartDate())
                    .redemptionDate(loan.getRedemptionDate())
                    .expiredDate(loan.getExpiredDate())
                    .principal(loan.getPrincipal())
                    .balance(loan.getPrincipal() - loan.getRedemptionMoney())
                    .interest(loan.getInterest())
                    .redemptionMoney(loan.getRedemptionMoney())
                    .build();
        }else {
            throw new IllegalArgumentException("상세 이력을 조회할 수 없습니다.");
        }
    }
}
