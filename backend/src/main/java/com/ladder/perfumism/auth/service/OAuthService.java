package com.ladder.perfumism.auth.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ladder.perfumism.auth.controller.dto.AuthorizationGoogle;
import com.ladder.perfumism.auth.controller.dto.AuthorizationKakao;
import com.ladder.perfumism.auth.controller.dto.response.GoogleUserInfoResponse;
import com.ladder.perfumism.auth.controller.dto.response.KakaoUserInfoResponse;
import com.ladder.perfumism.auth.controller.dto.response.TokenResponse;
import com.ladder.perfumism.auth.domain.RefreshToken;
import com.ladder.perfumism.auth.domain.RefreshTokenRepository;
import com.ladder.perfumism.auth.infrastructure.JwtTokenProvider;
import com.ladder.perfumism.global.exception.BusinessException;
import com.ladder.perfumism.global.exception.ErrorCode;
import com.ladder.perfumism.member.domain.Member;
import com.ladder.perfumism.member.domain.MemberRepository;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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

    @Value("${oauth.google.client-id}")
    private String GOOGLE_CLIENT_ID;
    @Value("${oauth.google.client-secret}")
    private String GOOGLE_CLIENT_SECRET;
    private static final String GOOGLE_REDIRECT_URL = "http://localhost:3000/login/oauth2/code/google";
    private static final String GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
    private static final String GOOGLE_USERINFO_URL = "https://oauth2.googleapis.com/tokeninfo?id_token=";

    @Value("${oauth.kakao.client-id}")
    private String KAKAO_CLIENT_ID;
    private static final String KAKAO_REDIRECT_URL = "http://localhost:3000/login/oauth2/code/kakao";
    private static final String KAKAO_TOKEN_URL = "https://kauth.kakao.com/oauth/token";
    private static final String KAKAO_USERINFO_URL = "https://kapi.kakao.com/v2/user/me";
    private static final String GRANT_TYPE = "authorization_code";

    public OAuthService(RestTemplate restTemplate, ObjectMapper objectMapper,
        MemberRepository memberRepository, JwtTokenProvider jwtTokenProvider,
        RefreshTokenRepository refreshTokenRepository) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
        this.memberRepository = memberRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @Transactional
    public void oauth2AuthorizationGoogle(String code, HttpServletResponse response) {
        AuthorizationGoogle authorization = callTokenApiGoogle(code);
        GoogleUserInfoResponse userInfoResponse = callGoogleUserInfoByAccessToken(authorization.getAccess_token(), authorization.getId_token());

        Member member = loadGoogleUser(userInfoResponse);
        TokenResponse tokenResponse = jwtTokenProvider.createToken(member.getEmail(), member.getAuthority());
        Long refreshTokenId = saveRefreshToken(member, tokenResponse);
        setTokenToCookie(tokenResponse.getAccessToken(), refreshTokenId, response);
    }

    private AuthorizationGoogle callTokenApiGoogle(String code) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", GRANT_TYPE);
        params.add("client_id", GOOGLE_CLIENT_ID);
        params.add("client_secret", GOOGLE_CLIENT_SECRET);
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

    private GoogleUserInfoResponse callGoogleUserInfoByAccessToken(String accessToken, String idToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        try {
            ResponseEntity<GoogleUserInfoResponse> response = restTemplate.postForEntity(GOOGLE_USERINFO_URL+idToken, request, GoogleUserInfoResponse.class);
            return response.getBody();
        } catch (RestClientException e) {
            e.printStackTrace();
            throw new BusinessException(ErrorCode.GLOBAL_INTERNAL_SERVER_ERROR);
        }
    }

    @Transactional
    public void oauth2AuthorizationKakao(String code, HttpServletResponse response) {
        AuthorizationKakao authorization = callTokenApiKakao(code);
        KakaoUserInfoResponse userInfoResponse = callUserInfoByAccessToken(authorization.getAccess_token());

        Member member = loadKakaoUser(userInfoResponse);
        TokenResponse tokenResponse = jwtTokenProvider.createToken(member.getEmail(), member.getAuthority());
        Long refreshTokenId = saveRefreshToken(member, tokenResponse);
        setTokenToCookie(tokenResponse.getAccessToken(), refreshTokenId, response);
    }

    private AuthorizationKakao callTokenApiKakao(String code) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", GRANT_TYPE);
        params.add("client_id", KAKAO_CLIENT_ID);
        params.add("redirect_uri", KAKAO_REDIRECT_URL);
        params.add("code", code);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(KAKAO_TOKEN_URL, request, String.class);
            return objectMapper.readValue(response.getBody(), AuthorizationKakao.class);
        } catch (RestClientException | JsonProcessingException e) {
            e.printStackTrace();
            throw new BusinessException(ErrorCode.GLOBAL_INTERNAL_SERVER_ERROR);
        }
    }

    private KakaoUserInfoResponse callUserInfoByAccessToken(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        try {
            ResponseEntity<KakaoUserInfoResponse> response = restTemplate.postForEntity(KAKAO_USERINFO_URL, request,
                KakaoUserInfoResponse.class);
            return response.getBody();
        } catch (RestClientException e) {
            e.printStackTrace();
            throw new BusinessException(ErrorCode.GLOBAL_INTERNAL_SERVER_ERROR);
        }
    }

    @Transactional
    public Member loadKakaoUser(KakaoUserInfoResponse response) {
        String email = (String) response.getKakaoAccount().get("email");
        Member member = memberRepository.findByEmail(email)
            .orElse(response.toEntity());
        member.checkSocialMember();
        return memberRepository.save(member);
    }

    @Transactional
    public Member loadGoogleUser(GoogleUserInfoResponse response) {
        Member member = memberRepository.findByEmail(response.getEmail())
            .orElse(response.toEntity());
        member.checkSocialMember();
        return memberRepository.save(member);
    }

    @Transactional
    public Long saveRefreshToken(Member member, TokenResponse tokenResponse) {
        RefreshToken refreshToken = refreshTokenRepository.findByKey(member.getEmail())
            .orElse(RefreshToken.builder()
                .key(member.getEmail())
                .value(tokenResponse.getRefreshToken())
                .build());
        refreshTokenRepository.save(refreshToken);
        return refreshToken.getId();
    }

    private void setTokenToCookie(String accessToken, Long refreshTokenId, HttpServletResponse response) {
        Cookie accessTokenCookie = new Cookie("access_token", accessToken);
        accessTokenCookie.setMaxAge(7 * 24 * 60 * 60); // expires in 7 days
        accessTokenCookie.setSecure(true);
//        cookie.setHttpOnly(true);
        accessTokenCookie.setPath("/");
        response.addCookie(accessTokenCookie);

        Cookie refreshIdCookie = new Cookie("index", Long.toString(refreshTokenId));
        refreshIdCookie.setMaxAge(7 * 24 * 60 * 60); // expires in 7 days
        refreshIdCookie.setSecure(true);
//        cookie.setHttpOnly(true);
        refreshIdCookie.setPath("/");
        response.addCookie(refreshIdCookie);
    }
}
