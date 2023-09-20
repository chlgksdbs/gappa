package com.sixheadword.gappa.util;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;


@SpringBootTest
@RunWith(SpringRunner.class)
class SmsUtilTest {

    @Autowired SmsUtil smsUtil;

//    @Test
//    public void 문자전송테스트() throws Exception {
//        smsUtil.sendSMS("01024126237", "하이요");
//    }
}