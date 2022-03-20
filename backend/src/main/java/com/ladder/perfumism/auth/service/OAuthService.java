package com.ladder.perfumism.auth.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ladder.perfumism.auth.controller.dto.AuthorizationGoogle;
import com.ladder.perfumism.auth.controller.dto.response.AccessTokenResponse;
import com.ladder.perfumism.auth.controller.dto.response.GoogleUserInfoResponse;
import com.ladder.perfumism.auth.domain.RefreshTokenRepository;
import com.ladder.perfumism.auth.infrastructure.JwtTokenProvider;
import com.ladder.perfumism.global.exception.BusinessException;
import com.ladder.perfumism.global.exception.CustomException;
import com.ladder.perfumism.global.exception.ErrorCode;
import com.ladder.perfumism.member.domain.MemberRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Service
public class OAuthService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    @Value("${oauth.google.client-id")
    private String GOOGLE_CLIENT_ID;
    private static final String GOOGLE_REDIRECT_URL = "http://localhost:3000/login/oauth2/code/google";
    private static final String GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
    private static final String GOOGLE_USERINFO_URL = "https://oauth2.googleapis.com/tokeninfo?id_token=";

    public OAuthService(RestTemplate restTemplate, ObjectMapper objectMapper,
        MemberRepository memberRepository, JwtTokenProvider jwtTokenProvider,
        RefreshTokenRepository refreshTokenRepository) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
        this.memberRepository = memberRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    private AuthorizationGoogle callTokenApiGoogle(String code) {
        String grantType = "authorization_code";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", grantType);
        params.add("client_id", GOOGLE_CLIENT_ID);
        params.add("redirect_uri", GOOGLE_REDIRECT_URL);
        params.add("code", code);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(GOOGLE_TOKEN_URL, request, String.class);
            AuthorizationGoogle authorization = objectMapper.readValue(response.getBody(), AuthorizationGoogle.class);
            return authorization;
        } catch (RestClientException | JsonProcessingException e) {
            e.printStackTrace();
            throw new BusinessException(ErrorCode.GLOBAL_INTERNAL_SERVER_ERROR);
        }
    }

    private GoogleUserInfoResponse callGoogleUserIfoByAccessToken(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        try {
            ResponseEntity<GoogleUserInfoResponse> response = restTemplate.postForEntity(GOOGLE_USERINFO_URL, request,
                GoogleUserInfoResponse.class);
            return response.getBody();
        } catch (RestClientException e) {
            e.printStackTrace();
            throw new BusinessException(ErrorCode.GLOBAL_INTERNAL_SERVER_ERROR);
        }
    }
}
