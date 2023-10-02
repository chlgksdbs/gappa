package com.sixheadword.gappa.config.Batch.itemProcessor;

import com.sixheadword.gappa.config.Batch.dto.AfterPeriodLoanDto;
import com.sixheadword.gappa.loan.Loan;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.StepExecution;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Slf4j
@RequiredArgsConstructor
@Configuration
public class ItemProcessorConfig {

    private final StepExecution stepExecution;

    @Bean
    public ItemProcessor<AfterPeriodLoanDto, AfterPeriodLoanDto> afterPeriodLoanProcessor() {
        // AfterPeriodLoanProcessorCustom을 사용하는 ItemProcessor 설정
        return new AfterPeriodLoanProcessorCustom(stepExecution);
    }

    @Bean
    public ItemProcessor<Loan, Loan> beforePeriodLoanProcessor() {
        // BeforePeriodLoanProcessorCustom을 사용하는 ItemProcessor 설정
        return new BeforePeriodLoanProcessorCustom();
    }

}
