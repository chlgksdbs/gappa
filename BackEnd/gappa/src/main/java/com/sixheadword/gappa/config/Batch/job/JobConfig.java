package com.sixheadword.gappa.config.Batch.job;

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

    private final Step afterPeriodLoanStep;
    private final Step beforePeriodLoanStep;
    private final Step inactiveUserStep;

    // afterPeriodLoanJob: 기한이 지난 대출 건에 대한 Job (강제 이체)
    @Bean
    public Job afterPeriodLoanJob() {
        return jobBuilderFactory.get("afterPeriodLoanJob")
                .start(afterPeriodLoanStep)
                .build();
    }

    // beforePeriodLoanJob: 기한이 지나기 전 대출 건에 대한 Job (재촉 알림)
    @Bean
    public Job beforePeriodLoanJob() {
        return jobBuilderFactory.get("beforePeriodLoanJob")
                .start(beforePeriodLoanStep)
                .build();
    }

    // inactiveUserJob: 회원 탈퇴 후, 1년이 지난 유저를 DB에서 삭제 (휴먼계정 삭제)
    @Bean
    public Job inactiveUserJob() {
        return jobBuilderFactory.get("inactiveUserJob")
                .start(inactiveUserStep)
                .build();
    }
}
