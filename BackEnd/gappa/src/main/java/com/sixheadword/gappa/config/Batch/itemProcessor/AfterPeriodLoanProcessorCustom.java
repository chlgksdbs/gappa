package com.sixheadword.gappa.config.Batch.itemProcessor;

import com.sixheadword.gappa.accountHistory.AccountHistory;
import com.sixheadword.gappa.config.Batch.dto.AfterPeriodLoanDto;
import com.sixheadword.gappa.loanHistory.entity.LoanHistory;
import com.sixheadword.gappa.user.User;
import com.sixheadword.gappa.utils.SmsUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.ItemProcessor;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
public class AfterPeriodLoanProcessorCustom implements ItemProcessor<AfterPeriodLoanDto, AfterPeriodLoanDto> {

    private final SmsUtil smsUtil;

    @Override
    public AfterPeriodLoanDto process(AfterPeriodLoanDto afterPeriodLoanDto) throws Exception {
        log.info(">>>>> Spring Batch With AfterPeriodLoanProcessor was Executed");

        Long remainingAmount = afterPeriodLoanDto.getLoan().getPrincipal()
                + (afterPeriodLoanDto.getLoan().getInterest() * ChronoUnit.DAYS.between(afterPeriodLoanDto.getLoan().getRedemptionDate(), LocalDateTime.now()))
                - afterPeriodLoanDto.getLoan().getRedemptionMoney();

        User fromUser = afterPeriodLoanDto.getFromUser();
        User toUser = afterPeriodLoanDto.getToUser();

        // 대출 건의 from_user의 Account 테이블의 대표 계좌 잔액 확인
        if (afterPeriodLoanDto.getFromUserAccount().getBalance() >= remainingAmount) { // 잔액이 상환금보다 큰 경우, to_user에게 이체 수행

            // (1) from_user, to_user AccountHistory 칼럼 추가
            AccountHistory fromUserAccountHistory = new AccountHistory();
            fromUserAccountHistory.setAccount(afterPeriodLoanDto.getFromUserAccount());
            fromUserAccountHistory.setToUser(afterPeriodLoanDto.getToUser());
            fromUserAccountHistory.setOldBalance(afterPeriodLoanDto.getFromUserAccount().getBalance());
            fromUserAccountHistory.setCreatedAt(LocalDateTime.now());

            AccountHistory toUserAccountHistory = new AccountHistory();
            toUserAccountHistory.setAccount(afterPeriodLoanDto.getToUserAccount());
            toUserAccountHistory.setToUser(afterPeriodLoanDto.getFromUser());
            toUserAccountHistory.setOldBalance(afterPeriodLoanDto.getToUserAccount().getBalance());
            toUserAccountHistory.setCreatedAt(LocalDateTime.now());

            // (2) from_user 잔액 (-), to_user 잔액 (+)
            afterPeriodLoanDto.getFromUserAccount().setMinusBalance(remainingAmount);
            afterPeriodLoanDto.getToUserAccount().setAddBalance(remainingAmount);

            fromUserAccountHistory.setNewBalance(afterPeriodLoanDto.getFromUserAccount().getBalance());
            fromUserAccountHistory.setAccountType(false);
            fromUserAccountHistory.setAmount(remainingAmount);
            toUserAccountHistory.setNewBalance(afterPeriodLoanDto.getToUserAccount().getBalance());
            toUserAccountHistory.setAccountType(true);
            toUserAccountHistory.setAmount(remainingAmount);

            // (3) from_user, to_user AccountHistory를 DTO에 적재
            afterPeriodLoanDto.setFromUserAccountHistory(fromUserAccountHistory);
            afterPeriodLoanDto.setToUserAccountHistory(toUserAccountHistory);

            // (4) status 값을 'C'로 변경
            afterPeriodLoanDto.getLoan().setStatus('C');

            // (5) expired_date 값을 now()로 추가
            afterPeriodLoanDto.getLoan().setExpiredDate(LocalDateTime.now());
            
            // (6) 기존 상환금 추출
            Long oldRedemptionMoney = afterPeriodLoanDto.getLoan().getRedemptionMoney();

            // (7) LoanHistory 테이블에 해당 대출 건에 대해 칼럼 추가
            LoanHistory loanHistory = afterPeriodLoanDto.getLoanHistory();
            loanHistory.setAmount(remainingAmount);
            loanHistory.setOldRedemptionMoney(oldRedemptionMoney);
            loanHistory.setNewRedemptionMoney(oldRedemptionMoney + remainingAmount);
            loanHistory.setLoan(afterPeriodLoanDto.getLoan());
            loanHistory.setTransactionDate(LocalDateTime.now());
            afterPeriodLoanDto.setLoanHistory(loanHistory);

            // (8) redemption_money 값에 remainingAmount 값을 추가
            afterPeriodLoanDto.getLoan().setRedemptionMoney(oldRedemptionMoney + remainingAmount);

            // (9) 강제 이체 건에 대한 SMS 문자 발송
            String message = "[Gappa] "
                    + toUser.getName()
                    + "님과의 대출 건이 연체됨에 따라 "
                    + remainingAmount
                    + "(원)이 강제 상환되었습니다. ";
            smsUtil.sendSMS(fromUser.getPhone(), message, Optional.of(LocalDateTime.now().plusMinutes(270)));

        } else { // 잔액이 상환금보다 작은 경우, 날짜 계산 후 미납 SMS 문자 발송
            String message = "[Gappa] "
                    + toUser.getName()
                    + "님에게 대출금액 "
                    + remainingAmount
                    + "(원)이 "
                    + ChronoUnit.DAYS.between(afterPeriodLoanDto.getLoan().getRedemptionDate(), LocalDateTime.now())
                    + "일 연체되었습니다. ";
            smsUtil.sendSMS(fromUser.getPhone(), message, Optional.of(LocalDateTime.now().plusMinutes(270)));
        }

        return afterPeriodLoanDto;
    }
}
