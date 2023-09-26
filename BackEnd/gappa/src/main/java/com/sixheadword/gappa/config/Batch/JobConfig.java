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
    private final Step overdueLoanStep;

    // afterPeriodLoanJob: 기한이 지난 대출 건에 대한 Job (강제 이체)
    @Bean
    public Job afterPeriodLoanJob() {
        return jobBuilderFactory.get("afterPeriodLoanJob")
                .start(checkPeriodLoanStep)        // step(1) 실행
                    .on("FAILED")           // FAILED인 경우 (status 값이 'O'인 경우)
                    .to(overdueLoanStep)           // step(2) 실행
                    .on("*")                // step(2) 결과 관계 없이
                    .end()                         // step(2) 종료 후, Flow 종료
                .from(checkPeriodLoanStep)         // step(1)로부터
                    .on("*")                // FAILED 외에 모든 경우
                    .end()                         // FLow 종료
                .end()
                .build();
    }

    // beforePeriodLoanJob: 기한이 지나기 전 대출 건에 대한 Job (재촉 알림)
    @Bean
    public Job beforePeriodLoanJob() {
        return jobBuilderFactory.get("beforePeriodLoanJob")
                .start(checkPeriodLoanStep)        // step(1) 실행
                    .on("FAILED")           // FAILED인 경우 (status 값이 'O'인 경우)
                    .to(overdueLoanStep)           // step(2) 실행
                    .on("*")                // step(2) 결과 관계 없이
                    .end()                         // step(2) 종료 후, Flow 종료
                .from(checkPeriodLoanStep)         // step(1)로부터
                    .on("*")                // FAILED 외에 모든 경우
                    .end()                         // FLow 종료
                .end()
                .build();
    }

    // inactiveUserJob: 회원 탈퇴 후, 1년이 지난 유저를 DB에서 삭제 (휴먼계정 삭제)
    @Bean
    public Job inactiveUserJob() {
        return jobBuilderFactory.get("beforePeriodLoanJob")
                .start(checkPeriodLoanStep)        // step(1) 실행
                .build();
    }
}
