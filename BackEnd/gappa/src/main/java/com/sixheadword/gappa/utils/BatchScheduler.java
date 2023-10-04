package com.sixheadword.gappa.utils;

import com.sixheadword.gappa.config.Batch.job.JobConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.JobParameter;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersInvalidException;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.repository.JobExecutionAlreadyRunningException;
import org.springframework.batch.core.repository.JobInstanceAlreadyCompleteException;
import org.springframework.batch.core.repository.JobRestartException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Component
public class BatchScheduler {

    private final JobLauncher jobLauncher;
    private final JobConfig jobConfig;

    // 매일 오전 4시 30분 실행 스케줄러 (강제 이체)
    @Scheduled(cron = "0 30 4 * * *")
    public void runAfterPeriodLoanJob() {

        // JobParameter 설정
        Map<String, JobParameter> confMap = new HashMap<>();
        confMap.put("time", new JobParameter(new Date()));

        // JobParameters 생성
        JobParameters jobParameters = new JobParameters(confMap);

        try {
            jobLauncher.run(jobConfig.afterPeriodLoanJob(), jobParameters);
        } catch (JobExecutionAlreadyRunningException
                | JobInstanceAlreadyCompleteException
                | JobParametersInvalidException
                | JobRestartException e) {
            log.error(e.getMessage());
        }
    }

    // 매일 오전 9시 실행 스케줄러 (재촉 알림)
    @Scheduled(cron = "0 0 9 * * *")
    public void runBeforePeriodLoanJob() {

        // JobParameter 설정
        Map<String, JobParameter> confMap = new HashMap<>();
        confMap.put("time", new JobParameter(new Date()));

        // JobParameters 생성
        JobParameters jobParameters = new JobParameters(confMap);

        try {
            jobLauncher.run(jobConfig.beforePeriodLoanJob(), jobParameters);
        } catch (JobExecutionAlreadyRunningException
                | JobInstanceAlreadyCompleteException
                | JobParametersInvalidException
                | JobRestartException e) {
            log.error(e.getMessage());
        }
    }

    // 매일 오전 0시 실행 스케줄러 (휴먼계정 삭제)
    @Scheduled(cron = "0 0 0 * * *")
    public void runInactiveUserJob() {

        // JobParameter 설정
        Map<String, JobParameter> confMap = new HashMap<>();
        confMap.put("time", new JobParameter(new Date()));

        // JobParameters 생성
        JobParameters jobParameters = new JobParameters(confMap);

        try {
            jobLauncher.run(jobConfig.inactiveUserJob(), jobParameters);
        } catch (JobExecutionAlreadyRunningException
                | JobInstanceAlreadyCompleteException
                | JobParametersInvalidException
                | JobRestartException e) {
            log.error(e.getMessage());
        }
    }
}
