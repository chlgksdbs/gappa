package com.sixheadword.gappa.config.Batch.step;

import com.sixheadword.gappa.FCM.FCMService;
import com.sixheadword.gappa.config.Batch.dto.AfterPeriodLoanDto;
import com.sixheadword.gappa.loan.Loan;
import com.sixheadword.gappa.loan.repository.LoanRepository;
import com.sixheadword.gappa.user.User;
import com.sixheadword.gappa.user.UserRepository;
import com.sixheadword.gappa.webAlarm.WebAlarm;
import com.sixheadword.gappa.webAlarm.WebAlarmRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Configuration
public class StepConfig {

    private final StepBuilderFactory stepBuilderFactory;

    private final UserRepository userRepository;
    private final LoanRepository loanRepository;
    private final WebAlarmRepository webAlarmRepository;

    private final FCMService fcmService;

    private final ItemReader<AfterPeriodLoanDto> afterPeriodLoanReader;
    private final ItemProcessor<AfterPeriodLoanDto, AfterPeriodLoanDto> afterPeriodLoanProcessor;
    private final ItemWriter<AfterPeriodLoanDto> afterPeriodLoanWriter;

    @Bean
    public Step afterPeriodLoanStep() {
        return stepBuilderFactory.get("afterPeriodLoanStep")
                .<AfterPeriodLoanDto, AfterPeriodLoanDto> chunk(1)
                .reader(afterPeriodLoanReader)
                .processor(afterPeriodLoanProcessor)
                .writer(afterPeriodLoanWriter)
                .build();
    }

    @Bean
    public Step beforePeriodLoanStep() {
        return stepBuilderFactory.get("beforePeriodLoanStep")
                .tasklet((contribution, chunkContext) -> {
                    // Loan 테이블의 대출 마감기한이 1주일 이내로 남은 진행중인 대출 건 읽기
                    List<Loan> upcomingDeadlineLoans =
                            loanRepository.findByStatusEqualsAndRedemptionDateBetween(
                                    'O',
                                    LocalDateTime.now().minusWeeks(1),
                                    LocalDateTime.now()
                            );

                    upcomingDeadlineLoans.forEach(loan -> {
                        Long remainingAmount = loan.getPrincipal() - loan.getRedemptionMoney();
                        String message = loan.getToUser().getName()
                                + "님과의 대출 기간이 "
                                + ChronoUnit.DAYS.between(loan.getRedemptionDate(), LocalDateTime.now())
                                + "일 남았습니다. "
                                + remainingAmount
                                + "(원)에 대한 상환이 필요합니다!";
                        fcmService.pushNotification(loan.getFromUser().getUserSeq(), message);

                        webAlarmRepository.save(new WebAlarm(loan.getFromUser(), loan.getToUser(), 'P', message));
                    });

                    return RepeatStatus.FINISHED;
                })
                .build();
    }

    @Bean
    public Step inactiveUserStep() {
        return stepBuilderFactory.get("inactiveUserStep")
                .tasklet((contribution, chunkContext) -> {
                    log.info(">>>>> Spring Batch With Deleted User was Executed");
                    List<User> oldUsers =
                            userRepository.findByStateFalseAndExpiredAtBefore(LocalDateTime.now().minusYears(1));

                    userRepository.deleteAll(oldUsers);
                    return RepeatStatus.FINISHED;
                })
                .build();
    }
}
