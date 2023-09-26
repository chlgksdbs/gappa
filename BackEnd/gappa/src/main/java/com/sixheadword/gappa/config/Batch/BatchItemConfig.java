package com.sixheadword.gappa.config.Batch;

import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.ItemWriter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Slf4j
@Configuration
public class BatchItemConfig {

    @Bean
    public ItemReader<String> itemReader() {
        return null;
    }

    @Bean
    public ItemProcessor<String, String> itemProcessor() {
        return null;
    }

    @Bean
    public ItemWriter<String> itemWriter() {
        return null;
    }
}
