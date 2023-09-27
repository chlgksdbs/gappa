package com.sixheadword.gappa.config.Batch;

import com.sixheadword.gappa.loan.Loan;
import com.sixheadword.gappa.loan.repository.LoanRepository;
import com.sixheadword.gappa.user.User;
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

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Configuration
public class StepConfig {

    private final StepBuilderFactory stepBuilderFactory;

    private final ItemReader<Loan> afterPeriodLoanReader;
    private final ItemReader<Loan> beforePeriodLoanReader;
    private final ItemReader<User> inactiveUserReader;
    private final ItemProcessor<Loan, Loan> afterPeriodLoanProcessor;
    private final ItemProcessor<Loan, Loan> beforePeriodLoanProcessor;
    private final ItemProcessor<User, User> inactiveUserProcessor;
    private final ItemWriter<Loan> afterPeriodLoanWriter;
    private final ItemWriter<Loan> beforePeriodLoanWriter;
    private final ItemWriter<User> inactiveUserWriter;

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
                .<User, User>chunk(10)
                .reader(inactiveUserReader)
                .processor(inactiveUserProcessor)
                .writer(inactiveUserWriter)
                .build();
    }
}
