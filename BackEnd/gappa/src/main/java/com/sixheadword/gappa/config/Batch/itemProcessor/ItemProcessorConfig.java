package com.sixheadword.gappa.config.Batch.itemProcessor;

import com.sixheadword.gappa.config.Batch.dto.AfterPeriodLoanDto;
import com.sixheadword.gappa.loan.Loan;
import com.sixheadword.gappa.utils.SmsUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Slf4j
@RequiredArgsConstructor
@Configuration
public class ItemProcessorConfig {

    private final SmsUtil smsUtil;

    @Bean
    public ItemProcessor<AfterPeriodLoanDto, AfterPeriodLoanDto> afterPeriodLoanProcessor() {
        // AfterPeriodLoanProcessorCustom을 사용하는 ItemProcessor 설정
        return new AfterPeriodLoanProcessorCustom(smsUtil);
    }

    @Bean
    public ItemProcessor<Loan, Loan> beforePeriodLoanProcessor() {
        // BeforePeriodLoanProcessorCustom을 사용하는 ItemProcessor 설정
        return new BeforePeriodLoanProcessorCustom();
    }

}
