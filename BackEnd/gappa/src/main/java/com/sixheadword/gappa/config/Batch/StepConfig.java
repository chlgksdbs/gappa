package com.sixheadword.gappa.config.Batch;

import com.sixheadword.gappa.loan.Loan;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.ItemWriter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Slf4j
@RequiredArgsConstructor
@Configuration
public class StepConfig {

    private final StepBuilderFactory stepBuilderFactory;
    private final ItemReader<Loan> overdueLoanReader;
    private final ItemProcessor<Loan, Loan> overdueLoanProcessor;
    private final ItemWriter<Loan> overdueLoanWriter;

    // checkPeriodLoanStep: 대출 기한을 체크하는 Step
    @Bean
    public Step checkPeriodLoanStep() {
        return stepBuilderFactory.get("checkPeriodLoanStep")
                .<Loan, Loan> chunk(10)
                .reader(overdueLoanReader)
                .processor(overdueLoanProcessor)
                .writer(overdueLoanWriter)
                .build();
    }

    // afterPeriodLoanStep: 대출 기한이 지난 건에 대한 Step
    @Bean
    public Step afterPeriodLoanStep() {
        return stepBuilderFactory.get("afterPeriodLoanStep")
                .<Loan, Loan> chunk(10)
                .reader(overdueLoanReader)
                .processor(overdueLoanProcessor)
                .writer(overdueLoanWriter)
                .build();
    }

    // beforePeriodLoanStep: 대출 기한이 임박한 건에 대한 Step (1주일 이내)
    @Bean
    public Step beforePeriodLoanStep() {
        return stepBuilderFactory.get("beforePeriodLoanStep")
                .<Loan, Loan> chunk(10)
                .reader(overdueLoanReader)
                .processor(overdueLoanProcessor)
                .writer(overdueLoanWriter)
                .build();
    }
}
