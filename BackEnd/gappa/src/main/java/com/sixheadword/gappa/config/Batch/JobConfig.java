package com.sixheadword.gappa.config.Batch;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Slf4j
@RequiredArgsConstructor
@Configuration
public class JobConfig {

    private final JobBuilderFactory jobBuilderFactory;
    private final Step checkPeriodLoanStep;
    private final Step afterPeriodLoanStep;
    private final Step beforePeriodLoanStep;

    // overdueLoanJob: 기한이 지난 대출 건에 대한 Job
    @Bean
    public Job overdueLoanJob() {
        return jobBuilderFactory.get("overdueLoanJob")
                .start(checkPeriodLoanStep) // step(1) 실행
                    .on("FAILED") // FAILED인 경우 (status 값이 'O'인 경우)
                    .to(beforePeriodLoanStep) // step(3) 실행
                    .on("*") // step(3) 결과 관계 없이
                    .end() // step(3) 종료 후, Flow 종료
                .from(checkPeriodLoanStep) // step(1)로부터
                    .on("*") // FAILED 외에 모든 경우
                    .to(afterPeriodLoanStep) // step(2) 실행
                    .on("*") // step(2) 결과 관계 없이
                    .end() // step(2) 종료 후, FLow 종료
                .end()
                .build();
    }
}
