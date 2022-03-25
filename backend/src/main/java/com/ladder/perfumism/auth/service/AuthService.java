package com.ladder.perfumism.auth.service;

import com.ladder.perfumism.auth.controller.dto.request.LoginRequest;
import com.ladder.perfumism.auth.controller.dto.request.ReissueRequest;
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
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    public AuthService(MemberRepository memberRepository,
        PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider,
        RefreshTokenRepository refreshTokenRepository) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @Transactional
    public void login(LoginRequest request, HttpServletResponse response) {
        Member member = memberRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_NOT_FOUND_BY_EMAIL));
        member.login(passwordEncoder, request.getPassword());

        TokenResponse tokenResponse = jwtTokenProvider.createToken(member.getEmail(), member.getAuthority());
        Long refreshTokenId = saveRefreshToken(member, tokenResponse);
        setTokenToCookie(tokenResponse.getAccessToken(), refreshTokenId, response);
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

    @Transactional
    public void reissue(ReissueRequest request, HttpServletResponse response) {
        // Refresh Token 검증
        String refreshTokenRequest = refreshTokenRepository.findById(request.getId())
            .orElseThrow(() -> new BusinessException(ErrorCode.INVALID_EXPIRED_REFRESH_TOKEN)).getValue();
        jwtTokenProvider.validateRefreshToken(refreshTokenRequest);

        Authentication authentication = jwtTokenProvider.getAuthentication(request.getAccessToken());

        // 저장소에서 Email로 refresh token 가져옴
        RefreshToken refreshToken = refreshTokenRepository.findByKey(authentication.getName())
            .orElseThrow(() -> new BusinessException(ErrorCode.INVALID_LOGOUT_USER_JWT));

        // refresh token 일치하는지 검사
        refreshToken.validateValue(refreshTokenRequest);

        // 새로운 토큰 생성
        TokenResponse tokenResponse = jwtTokenProvider.createToken(authentication.getName(),
            jwtTokenProvider.getAuthority(authentication));

        // 새로운 refresh token
        refreshToken.updateToken(tokenResponse.getRefreshToken());
        setTokenToCookie(tokenResponse.getAccessToken(), refreshToken.getId(), response);
    }
}
