package com.sixheadword.gappa.utils;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.Optional;

@Component
public class SmsUtil {
    private static final Logger logger = LoggerFactory.getLogger(SmsUtil.class);

    @Value("${accessKey}")
    private String accessKey;

    @Value("${secretKey}")
    private String secretKey;

    @Value("${serviceId}")
    private String serviceId;

    @Value("${systemPhoneNumber}") // 문자 전송 번호
    private String from;

    public void sendSMS(String to, String content) throws IOException, NoSuchAlgorithmException, InvalidKeyException {
        sendSMS(to, content, Optional.empty());
    }

    public void sendSMS(String to, String content, Optional<LocalDateTime> reserveTime) throws IOException, NoSuchAlgorithmException, InvalidKeyException {
        String hostNameUrl = "https://sens.apigw.ntruss.com";
        String requestUrl = "/sms/v2/services/" + serviceId + "/messages";
        String apiUrl = hostNameUrl + requestUrl;
        String method = "POST";
        String timestamp = Long.toString(System.currentTimeMillis());

        JSONObject bodyJson = createBodyJson(from, to, content, reserveTime.isPresent(), reserveTime.orElse(null));

        String body = bodyJson.toJSONString();
        logger.info("Request body: {}", body);

        HttpURLConnection con = openConnection(requestUrl, apiUrl, timestamp, method);
        sendRequest(con, body);
        handleResponse(con);
    }

    private JSONObject createBodyJson(String from, String to, String content, boolean reserve, LocalDateTime reserveTime) {
        JSONObject toJson = new JSONObject();
        toJson.put("content", content);
        toJson.put("to", to);

        JSONArray toArr = new JSONArray();
        toArr.add(toJson);

        JSONObject bodyJson = new JSONObject();
        bodyJson.put("type", "sms");
        bodyJson.put("contentType", "comm");
        bodyJson.put("countryCode", "82");
        bodyJson.put("from", from);
        bodyJson.put("content", content);
        bodyJson.put("messages", toArr);
        if (reserve && reserveTime != null) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
            bodyJson.put("reserveTime", reserveTime.format(formatter));
        }

        return bodyJson;
    }

    private HttpURLConnection openConnection(String requestUrl, String apiUrl, String timestamp, String method) throws IOException, NoSuchAlgorithmException, InvalidKeyException {
        URL url = new URL(apiUrl);
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setUseCaches(false);
        con.setDoOutput(true);
        con.setRequestProperty("content-type", "application/json");
        con.setRequestProperty("x-ncp-apigw-timestamp", timestamp);
        con.setRequestProperty("x-ncp-iam-access-key", accessKey);
        con.setRequestProperty("x-ncp-apigw-signature-v2", makeSignature(requestUrl, timestamp, method, accessKey, secretKey));
        con.setRequestMethod(method);
        return con;
    }

    private void sendRequest(HttpURLConnection con, String body) throws IOException {
        try (DataOutputStream wr = new DataOutputStream(con.getOutputStream())) {
            wr.write(body.getBytes());
            wr.flush();
        }
    }

    private void handleResponse(HttpURLConnection con) throws IOException {
        int responseCode = con.getResponseCode();
        if (responseCode == 202) {
            logger.info("Response Code: {}", responseCode);
        } else {
            try (BufferedReader br = new BufferedReader(new InputStreamReader(con.getErrorStream()))) {
                StringBuilder errorResponse = new StringBuilder();
                String errorLine;
                while ((errorLine = br.readLine()) != null) {
                    errorResponse.append(errorLine);
                }
                throw new RuntimeException("Failed : HTTP error code : " + responseCode + ", message : " + errorResponse.toString());
            }
        }
    }

    public static String makeSignature(String url, String timestamp, String method, String accessKey, String secretKey) throws NoSuchAlgorithmException, InvalidKeyException, UnsupportedEncodingException {
        String space = " ";
        String newLine = "\n";

        String message = new StringBuilder()
                .append(method)
                .append(space)
                .append(url)
                .append(newLine)
                .append(timestamp)
                .append(newLine)
                .append(accessKey)
                .toString();

        SecretKeySpec signingKey = new SecretKeySpec(secretKey.getBytes("UTF-8"), "HmacSHA256");
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(signingKey);

        byte[] rawHmac = mac.doFinal(message.getBytes("UTF-8"));
        return Base64.getEncoder().encodeToString(rawHmac);
    }

    public String makeSmsContent(String certificationNumber){
        return "[Gappa]인증번호 ["+certificationNumber+"]를 입력해주세요.";
    }
}
