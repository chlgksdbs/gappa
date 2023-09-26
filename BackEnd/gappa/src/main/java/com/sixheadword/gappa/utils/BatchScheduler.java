package com.sixheadword.gappa.utils;

import com.sixheadword.gappa.config.Batch.JobConfig;
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

    // 매일 오전 4시 30분 실행 스케줄러
    @Scheduled(cron = "0 30 4 * * *")
    public void runSpringBatchJob() {

        // JobParameter 설정
        Map<String, JobParameter> confMap = new HashMap<>();
        confMap.put("time", new JobParameter(new Date()));

        // JobParameters 생성
        JobParameters jobParameters = new JobParameters(confMap);

        try {
            jobLauncher.run(jobConfig.overdueLoanJob(), jobParameters);
        } catch (JobExecutionAlreadyRunningException
                | JobInstanceAlreadyCompleteException
                | JobParametersInvalidException
                | JobRestartException e) {
            log.error(e.getMessage());
        }
    }
}
