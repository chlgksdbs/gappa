package com.sixheadword.gappa.config.Batch.ItemReader;

import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.NonTransientResourceException;
import org.springframework.batch.item.ParseException;
import org.springframework.batch.item.UnexpectedInputException;

import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

// ItemReader의 기본 반환 타입은 단수형이기 때문에, 1개씩 DB에 SELECT 요청하므로 비효율적임
// QueueItemReader 클래스를 구현하여, Target Data를 한 번에 불러와 Queue에 담을 예정
public class QueueItemReader<T> implements ItemReader<T> {

    private final Queue<T> queue;

    public QueueItemReader(List<T> data) {
        this.queue = new LinkedList<>(data);
    }

    @Override
    public T read() throws Exception, UnexpectedInputException, ParseException, NonTransientResourceException {
        return queue.poll();
    }
}
