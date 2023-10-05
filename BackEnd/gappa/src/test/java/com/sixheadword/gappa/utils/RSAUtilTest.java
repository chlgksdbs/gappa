package com.sixheadword.gappa.utils;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
class RSAUtilTest {

    @Autowired BCryptPasswordEncoder encoder;
    @Autowired
    RSAUtil rsaUtil;

//    @Test
//    public void RSA_Base64_암복호화_테스트()
//            throws NoSuchAlgorithmException, IllegalBlockSizeException, InvalidKeyException,
//            BadPaddingException, NoSuchPaddingException, UnsupportedEncodingException,
//            InvalidKeySpecException {
//        // RSA 키쌍을 생성
//        KeyPair keyPair = RSAUtil.genRSAKeyPair();
//
//        PublicKey publicKey = keyPair.getPublic();
//        PrivateKey privateKey = keyPair.getPrivate();
//
//        String plainText = "RSA Encryption test";
//
//        // Base64 인코딩된 암호화 문자열
//        String encrypted = RSAUtil.encryptRSA(plainText, publicKey);
//
//        // 복호화
//        String decrypted = RSAUtil.decryptRSA(encrypted, privateKey);
//        System.out.println("publicKey = " + publicKey);
//        System.out.println("privateKey = " + privateKey);
//        System.out.println("encrypted = " + encrypted);
//        System.out.println("decrypted = " + decrypted);
//
//        Assert.assertEquals(plainText, decrypted);
//
//        // 공개키를 Base64 인코딩한 문자일을 만듦
//        byte[] bytePublicKey = publicKey.getEncoded();
//        String base64PublicKey = Base64.getEncoder().encodeToString(bytePublicKey);
//
//        // 개인키를 Base64 인코딩한 문자열을 만듦
//        byte[] bytePrivateKey = privateKey.getEncoded();
//        String base64PrivateKey = Base64.getEncoder().encodeToString(bytePrivateKey);
//
//        // base64 암호화한 String 에서 Public Key 를 다시생성한후 암호화 테스트를 진행
//        PublicKey rePublicKey = RSAUtil.getPublicKeyFromBase64Encrypted(base64PublicKey);
//        String encryptedRe = RSAUtil.encryptRSA(plainText, rePublicKey);
//        String decryptedRe = RSAUtil.decryptRSA(encryptedRe, privateKey);
//        System.out.println("base64PublicKey = " + base64PublicKey);
//        System.out.println("base64PrivateKey = " + base64PrivateKey);
//        System.out.println("encryptedRe = " + encryptedRe);
//        System.out.println("decryptedRe = " + decryptedRe);
//        Assert.assertEquals(plainText, decryptedRe);
//
//        // base64 암호화한 String 에서 Private Key 를 다시생성한후 복호화 테스트를 진행
//        PrivateKey privateKeyRe = RSAUtil.getPrivateKeyFromBase64Encrypted(base64PrivateKey);
//        String decryptedReRe = RSAUtil.decryptRSA(encryptedRe, privateKeyRe);
//        System.out.println("privateKeyRe = " + privateKeyRe);
//        System.out.println("decryptedReRe = " + decryptedReRe);
//
//        Assert.assertEquals(decrypted, decryptedReRe);
//    }

//    @Test
//    public void test() throws NoSuchAlgorithmException, InvalidKeySpecException, NoSuchPaddingException, IllegalBlockSizeException, UnsupportedEncodingException, BadPaddingException, InvalidKeyException, InvalidKeyException {
//        PrivateKey privateKey = rsaUtil.getPrivateKeyFromBase64Encrypted("MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAJcM6eZ2p5c1h9z0OxUMWiMEwMA7kMhhLTf4/tEfSNsD5NwDK+9U0rZ71K15s5Y642UNpcxMwdK1d1uFBu8tzL6/gSI/A7xnyYKuIx5OlBU+r1A/6jB2WlmmCdN3leG0szku8/YAD96HQZ4qVDPkd4zNM6LuNRl5b0u0rkqctSitAgMBAAECgYA9E9ewfOIfXmHlkkwhorD/3/ggwvU0UTb7nw9KeB/5j4WHATFOwTnC2CeTTda0NHOmdPJJve/Rx9bPhuba5+YVx2XP5o4RELt5Qy+LBnQeCVTDhpPLJ4Hr2GbBv5gbFdtPUJrmMUJ+UV2sGWxLb5HKi8JVYEjTQoBgPOvV0ONxgQJBAPvZYoJHFtQ1LaL5/1ZEsx47sNV0/Z//9cGcG98Y9ex5MAtAf6msRXgKAhWQs+bmfTFoaZiCfnjTJovKt7z3ERUCQQCZijvPxKY000KMGX0K8Y6W0nq2eOQ1ZptvtMIVXALe7L3KEenppS02XHWkPFzAMSvDZJTGH4pQ1U7hSRjgMa85AkEAu52oCxFWamPrSXwfwW6QWTdydrIetvEBbWgUQ1De83kcV2WHNSlG3zPldZdEzgBqx0HXWGvuN6hlEMLFuhn8OQJAdPA9YZ6KX81O79kxzTXwvZoM8BDe7nT5iXiIITB010hDvDUsjFDLQI3m43E9yvsoM6bVUJgRBkOP0jGUCpyMsQJBANrMBqpTJKq8dtElhsrtJYNF3oj/9ikY7rncuwFND9YZ8Q+9fdKbzl96J369nyPhHTnfahMGVkpeGa9PQevRzqU=");
//        String decryptRSA = rsaUtil.decryptRSA("ENZr7hTw2gdKWmDC0H/X5OjgDe+zM7T+luyhRMdjgsrYMj1Ifnq3Gne4Gf1jnKrV/c1udWpaN2toBys8Ov7s73FZ6bjvwmxmVdxRlv6IiPHU2eYu+38Rgas3LUfRcoY+M4Qt/CEi52DZ5s6X2iu0MkgovT1y/3cwHqSs6fCNSN8=", privateKey);
//    }
}