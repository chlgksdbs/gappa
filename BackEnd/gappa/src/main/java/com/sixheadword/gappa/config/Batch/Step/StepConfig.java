package com.sixheadword.gappa.config.Batch.Step;

import com.sixheadword.gappa.loan.Loan;
import com.sixheadword.gappa.loan.repository.LoanRepository;
import com.sixheadword.gappa.user.User;
import com.sixheadword.gappa.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.ExitStatus;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Configuration
public class StepConfig {

    private final UserRepository userRepository;

    private final StepBuilderFactory stepBuilderFactory;

    private final ItemReader<Loan> afterPeriodLoanReader;
    private final ItemReader<Loan> beforePeriodLoanReader;
    private final ItemProcessor<Loan, Loan> afterPeriodLoanProcessor;
    private final ItemProcessor<Loan, Loan> beforePeriodLoanProcessor;
    private final ItemWriter<Loan> afterPeriodLoanWriter;
    private final ItemWriter<Loan> beforePeriodLoanWriter;

    @Bean
    public Step afterPeriodLoanStep() {
        return stepBuilderFactory.get("afterPeriodLoanStep")
                .<Loan, Loan> chunk(10)
                .reader(afterPeriodLoanReader)
                .processor(afterPeriodLoanProcessor)
                .writer(afterPeriodLoanWriter)
                .build();
    }

    @Bean
    public Step beforePeriodLoanStep() {
        return stepBuilderFactory.get("beforePeriodLoanStep")
                .<Loan, Loan>chunk(10)
                .reader(beforePeriodLoanReader)
                .processor(beforePeriodLoanProcessor)
                .writer(beforePeriodLoanWriter)
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
