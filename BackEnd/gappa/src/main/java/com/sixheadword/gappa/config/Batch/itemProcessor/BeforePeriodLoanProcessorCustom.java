package com.sixheadword.gappa.config.Batch.itemProcessor;

import com.sixheadword.gappa.loan.Loan;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.ItemProcessor;

@Slf4j
@RequiredArgsConstructor
public class BeforePeriodLoanProcessorCustom implements ItemProcessor<Loan, Loan> {

    @Override
    public Loan process(Loan item) throws Exception {
        log.info(">>>>> Spring Batch With BeforePeriodLoanProcessor was Executed");

        return null;
    }
}
