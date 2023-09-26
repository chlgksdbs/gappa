package com.sixheadword.gappa.config.Batch;

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
    private final ItemReader<String> itemReader;
    private final ItemProcessor<String, String> itemProcessor;
    private final ItemWriter<String> itemWriter;

    @Bean
    public Step step1() {
        return stepBuilderFactory.get("step1")
                .<String, String> chunk(10)
                .reader(itemReader)
                .processor(itemProcessor)
                .writer(itemWriter)
                .build();
    }
}
