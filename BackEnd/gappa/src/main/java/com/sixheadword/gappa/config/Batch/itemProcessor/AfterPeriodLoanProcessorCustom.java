package com.sixheadword.gappa.config.Batch.itemProcessor;

import com.sixheadword.gappa.account.Account;
import com.sixheadword.gappa.config.Batch.dto.AfterPeriodLoanDto;
import com.sixheadword.gappa.loanHistory.entity.LoanHistory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.ExitStatus;
import org.springframework.batch.core.StepExecution;
import org.springframework.batch.item.ItemProcessor;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Slf4j
@RequiredArgsConstructor
public class AfterPeriodLoanProcessorCustom implements ItemProcessor<AfterPeriodLoanDto, AfterPeriodLoanDto> {

    private final StepExecution stepExecution;

    @Override
    public AfterPeriodLoanDto process(AfterPeriodLoanDto afterPeriodLoanDto) throws Exception {
        log.info(">>>>> Spring Batch With AfterPeriodLoanProcessor was Executed");

        Long remainingAmount = afterPeriodLoanDto.getLoan().getPrincipal()
                + (afterPeriodLoanDto.getLoan().getInterest() * ChronoUnit.DAYS.between(afterPeriodLoanDto.getLoan().getRedemptionDate(), LocalDateTime.now()))
                - afterPeriodLoanDto.getLoan().getRedemptionMoney();

        // 대출 건의 from_user의 Account 테이블의 대표 계좌 잔액 확인
        if (afterPeriodLoanDto.getFromUserAccount().getBalance() >= remainingAmount) { // 잔액이 상환금보다 큰 경우, to_user에게 이체 수행

            // (1) from_user 잔액 (-), to_user 잔액 (+)
            afterPeriodLoanDto.getFromUserAccount().setMinusBalance(remainingAmount);
            afterPeriodLoanDto.getToUserAccount().setAddBalance(remainingAmount);

            // (2) status 값을 'C'로 변경
            afterPeriodLoanDto.getLoan().setStatus('C');

            // (3) expired_date 값을 now()로 추가
            afterPeriodLoanDto.getLoan().setExpiredDate(LocalDateTime.now());
            
            // (4) 기존 상환금 추출
            Long oldRedemptionMoney = afterPeriodLoanDto.getLoan().getRedemptionMoney();

            // (5) LoanHistory 테이블에 해당 대출 건에 대해 칼럼 추가
            LoanHistory loanHistory = afterPeriodLoanDto.getLoanHistory();
            loanHistory.setAmount(remainingAmount);
            loanHistory.setOldRedemptionMoney(oldRedemptionMoney);
            loanHistory.setNewRedemptionMoney(oldRedemptionMoney + remainingAmount);
            loanHistory.setLoan(afterPeriodLoanDto.getLoan());
            loanHistory.setTransactionDate(LocalDateTime.now());
            afterPeriodLoanDto.setLoanHistory(loanHistory);

            // (6) redemption_money 값에 remainingAmount 값을 추가
            afterPeriodLoanDto.getLoan().setRedemptionMoney(oldRedemptionMoney + remainingAmount);

        } else { // 잔액이 상환금보다 작은 경우, ExitStatus.FAILED로 수정하고 failAfterPeriodLoanStep() 수행
            stepExecution.setExitStatus(ExitStatus.FAILED);
        }

        return afterPeriodLoanDto;
    }
}
