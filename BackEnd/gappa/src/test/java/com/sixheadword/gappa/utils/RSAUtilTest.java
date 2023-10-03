package com.sixheadword.gappa.utils;

class RSAUtilTest {
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
}