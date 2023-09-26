package com.sixheadword.gappa.config.Batch;

import com.sixheadword.gappa.loan.Loan;
import com.sixheadword.gappa.loan.repository.LoanRepository;
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
    private final ItemReader<Loan> overdueLoanReader;
    private final ItemProcessor<Loan, Loan> overdueLoanProcessor;
    private final ItemWriter<Loan> overdueLoanWriter;

    private final LoanRepository loanRepository;

    // checkPeriodLoanStep: 대출 기한을 체크하는 Step
    @Bean
    public Step checkPeriodLoanStep() {
        return stepBuilderFactory.get("checkPeriodLoanStep")
                .tasklet((contribution, chunkContext) -> {
                    log.info(">>>>> This is overdueLoanJob Step 1");
                    List<Loan> loans = loanRepository.findAll(); // 대출 전체 조회
                    loans.forEach(loan -> {
                        // 대출 진행 중이거나 대출 연체 중인 건이 하나 이상인 경우
                        if (loan.getStatus() == 'D' || loan.getStatus() == 'O')
                            contribution.setExitStatus(ExitStatus.FAILED);
                    });

                    return RepeatStatus.FINISHED;
                })
                .build();
    }

    // overdueLoanStep: 대출 기한이 지난 건에 대한 Step
    @Bean
    public Step overdueLoanStep() {
        return stepBuilderFactory.get("afterPeriodLoanStep")
                .<Loan, Loan> chunk(10)
                .reader(overdueLoanReader)
                .processor(overdueLoanProcessor)
                .writer(overdueLoanWriter)
                .build();
    }
}
