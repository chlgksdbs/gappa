package com.sixheadword.gappa.util;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;


@SpringBootTest
@RunWith(SpringRunner.class)
class RedisUtilTest {

    @Autowired RedisUtil redisUtil;
    
    @Test
    public void redis연결테스트() throws Exception {
        // 데이터를 Redis에 설정
        redisUtil.setDataExpire("kim", "donghyun", 10000);

        // 바로 조회해서 데이터가 있는지 확인
        Assertions.assertEquals("donghyun", redisUtil.getData("kim"));

        // 11초 동안 대기 (데이터 만료를 기다림)
        Thread.sleep(11000);

        // 만료 후 데이터가 없어야 함
        Assertions.assertNull(redisUtil.getData("kim"));

    }
}